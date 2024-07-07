import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { RefreshCw, Mail, X } from "lucide-react";
import { forwardEmail } from "@/services/emailService";
import SucessoModal from "@/components/component/sucessoModal";

const CreateRedirect = ({ isOpen, onClose }) => {
  const [emailInput, setEmailInput] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [customName, setCustomName] = useState("");
  const [generateRandomName, setGenerateRandomName] = useState(false);
  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const dashboardDataString = localStorage.getItem("dashboardData");
      if (dashboardDataString) {
        const dashboardData = JSON.parse(dashboardDataString);
        const email = dashboardData.email;
        setEmailInput(email);
      }
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    setErrorCode(null);
    setSuccessMessage("");
    setSuccessEmail("");
    setCopied(false);
    onClose();
  };

  const handleGenerateRandomName = () => {
    const randomNumber = new Date().getMilliseconds();
    const emailUser = emailInput ? emailInput.replace(/@.*/, "") : "eficazmail";
    const userEmailCustom = emailUser + randomNumber;
    setCustomName(userEmailCustom);
    setGenerateRandomName(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput || (!customName && !generateRandomName)) {
      setError(
        "Por favor, insira um endereço de e-mail válido e um nome personalizado ou escolha gerar um nome aleatório"
      );
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    if (emailInput.includes("@eficaz.email")) {
      setError("Endereço de e-mail não pode ser @eficaz.email");
      setEmailInput("");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const finalCustomName = `${customName}@eficaz.email`;
  
      const response = await forwardEmail({
        userEmail: emailInput,
        customName: finalCustomName,
        purpose: finalidade,
      });
  
      
  
      const emailData = JSON.parse(localStorage.getItem("emailData")) || {
        data: [],
        pagination: {},
        stats: {}
      };
  
      const newEmailData = {
        data: [
          ...emailData.data,
          {
            address: response.data.address,
            forwarding: emailInput,
            status: "active",
            purpose: finalidade,
          },
        ],
        pagination: {
          ...emailData.pagination,
          totalEmails: (emailData.pagination.totalEmails || 0) + 1,
        },
        stats: {
          ...emailData.stats,
          total: (emailData.stats.total || 0) + 1,
          ativos: (emailData.stats.ativos || 0) + 1,
        }
      };
  
      
  
      localStorage.setItem("emailData", JSON.stringify(newEmailData));
      window.dispatchEvent(new Event("emailDataUpdated"));

      setSuccessMessage(
        `Email encaminhado com sucesso para ${response.data.address}`
      );
      setSuccessEmail(response.data.address);
      setCustomName("");
      setGenerateRandomName(false);
      setCopied(false);
      setModalType("success");
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Ocorreu um erro");
      setErrorCode(error.response?.status || null);
      setModalType("error");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-background-secondary dark:bg-custom-bg shadow-2xl rounded-lg overflow-hidden w-full max-w-md m-4"
          >
            <div className="p-6">
              <div className="flex justify-end">
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-text-secondary hover:text-text-main dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-main dark:text-white">
                  Criar Redirecionamento de Email
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="custom-email"
                    className="block text-sm font-medium text-text-main dark:text-gray-300 mb-1"
                  >
                    Email personalizado
                  </label>
                  <div className="relative">
                    <input
                      id="custom-email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                      type="text"
                      pattern="^[a-zA-Z0-9._]+$"
                      placeholder="Email personalizado"
                      value={customName}
                      onChange={(e) =>
                        setCustomName(e.target.value.toLowerCase())
                      }
                      
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary dark:text-gray-300">
                      @eficaz.email
                    </span>
                  </div>
                  <Button
                    className="mt-2 text-primary hover:text-brand-dark dark:text-brand-light dark:hover:text-brand-light-600 transition-colors duration-200"
                    type="button"
                    variant="ghost"
                    onClick={handleGenerateRandomName}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Gerar nome aleatório
                  </Button>
                </div>

                <div>
                  <label
                    htmlFor="redirect-email"
                    className="block text-sm font-medium text-text-main dark:text-gray-300 mb-1"
                  >
                    Redirecionar para
                  </label>
                  <input
                    id="redirect-email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                    type="email"
                    placeholder="Seu email de redirecionamento"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value.toLowerCase())}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="finalidade"
                    className="block text-sm font-medium text-text-main dark:text-gray-300 mb-1"
                  >
                    Finalidade (opcional)
                  </label>
                  <input
                    id="finalidade"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 ease-in-out"
                    type="text"
                    placeholder="Informe a finalidade deste redirecionamento"
                    value={finalidade}
                    onChange={(e) => setFinalidade(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-primary to-brand-dark hover:from-brand-dark-800 hover:to-brand-dark-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <RefreshCw className="animate-spin h-5 w-5 mr-3" />
                  ) : (
                    <Mail className="h-5 w-5 mr-2" />
                  )}
                  {loading ? "Criando..." : "Criar redirecionamento"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
      {isModalOpen && (
        <SucessoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          type={modalType}
          message={modalType === "error" ? error : successMessage}
          email={successEmail}
        />
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CreateRedirect;
