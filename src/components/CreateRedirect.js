"use client";
import React, { useState } from "react";
import { forwardEmail } from "@/services/emailService";
import { Button } from "@/components/ui/button";
import SucessoModal from "@/components/component/sucessoModal";

export default function CreateRedirect({ email: initialEmail }) {
  const [emailInput, setEmailInput] = useState(initialEmail || "");
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setError("");
    setErrorCode(null);
    setSuccessMessage("");
    setSuccessEmail("");
    setCopied(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(successEmail)
      .then(() => {
        setCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  const handleGenerateRandomName = () => {
    const randomNumber = new Date().getMilliseconds();

    if (emailInput) {
      const emailUser = emailInput.replace(/@.*/, "");
      const userEmailCustom = emailUser + randomNumber;
      setCustomName(userEmailCustom);
    } else {
      const baseEmail = "eficazmail";
      const randomEmail = baseEmail + randomNumber;
      setCustomName(randomEmail);
    }
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
      const finalCustomName = generateRandomName
        ? customName
        : `${customName}@eficaz.email`;

      const response = await forwardEmail({
        userEmail: emailInput,
        customName: finalCustomName,
        purpose: finalidade,
      });

      const emailData = JSON.parse(localStorage.getItem("emailData")) || { emails: [], pagination: {} };
      const newEmailData = {
        emails: [
          ...emailData.emails,
          { address: response.data.address, forwarding: emailInput, status: "active", purpose: finalidade }
        ],
        pagination: {
          ...emailData.pagination,
          totalEmails: (emailData.pagination.totalEmails || 0) + 1
        }
      };

      localStorage.setItem('emailData', JSON.stringify(newEmailData));
      window.dispatchEvent(new Event('emailDataUpdated'));

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
      setError(error.response?.data?.message || "Ocorreu um erro");
      setErrorCode(error.response?.status || null);
      setModalType("error");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full -ml-1 sm:ml-0 md:ml-0 lg:ml-0">
      <div className=" max-w-full  px-4 py-4 md:px-10 md:py-4 border border-border rounded-lg">
        <div className="flex ">
          <div className="space-y-2">
            <form className="space-y-8 flex flex-col  w-full text-gray-500" onSubmit={handleSubmit}>
              <div className="flex  w-full items-center">
                <div className="relative w-full h-14 flex items-center focus-within:border-primary  border border-gray-400 rounded-lg shadow-input">
                  <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-400 px-1 bg-white">
                    Email redirecionamento
                  </span>
                  <input
                    className="w-full px-4 py-2.5 text-gray-400 text-sm font-normal outline-none border-l"
                    id="custom-email"
                    pattern="^[a-zA-Z0-9._]+$"
                    placeholder="Email personalizado"
                    title="Por favor, insira um prefixo de email válido usando apenas letras, números, pontos e sublinhados"
                    type="text"
                    value={customName}
                    onChange={(e) =>
                      setCustomName(e.target.value.toLowerCase())
                    }
                    disabled={generateRandomName}
                  />
                  <p className="px-4 text-base text-coolGray-500 font-normal">
                    @eficaz.email
                  </p>
                </div>
                <Button
                  className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  type="button"
                  variant="ghost"
                  onClick={handleGenerateRandomName}
                >
                  <RefreshCwIcon className="h-5 w-5" />
                  <span className="sr-only">Aleatório</span>
                </Button>
              </div>

              <div className="relative w-full h-14 mt-10 py-4 px-3 mb-10 border border-gray-400 focus-within:border-primary rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-400 px-1 bg-white">
                  Ira direcionar para
                </span>
                <input
                  className="block w-full outline-none bg-transparent text-sm  text-gray-400 font-normal "
                  id="modalInput7-1"
                  type="email"
                  value={emailInput}
                  required
                  placeholder="Digite seu email aqui"
                  onChange={(e) => setEmailInput(e.target.value.toLowerCase())}
                />
              </div>
              <div className="relative w-full h-14 mt-10 py-4 px-3 mb-10 border border-gray-400 focus-within:border-primary rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs  text-gray-400 px-1 bg-white">
                  Finalidade{" "}
                  <span
                    className="text-[10px]"
                    style={{ verticalAlign: "super" }}
                  >
                    (*opcional )
                  </span>
                </span>
                <input
                  className="block w-full outline-none bg-transparent text-sm  text-gray-400 font-normal "
                  id="finalidade"
                  placeholder="Informe a finalidade deste redirecionamento"
                  
                  type="text"
                  value={finalidade}
                  onChange={(e) => setFinalidade(e.target.value.toLowerCase())}
                />
              </div>

              <div className="flex  w-full justify-center ">
                <button
                  className="group flex h-14 items-center justify-center rounded-lg lg:text-lg md:text-lg text-sm text-white transition-all duration-100 glow-sm hover:glow-md lg:w-96 md:w-96 sm:w-96 w-72 "
                  style={{
                    border: "none",
                    backgroundSize: "300% 100%",
                    transition: "all 0.3s ease 0s",
                    backgroundImage:
                      "linear-gradient(-60deg, rgb(9, 182, 162), rgb(107, 248, 231), rgb(9, 182, 162))",
                    backgroundPosition: "100% 0px",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundPosition = "0% 0px";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundPosition = "100% 0px";
                  }}
                  type="submit"
                  disabled={loading}
                >
                  <EmailIcon className="h-6 w-6 mr-2" />
                  {loading ? (
                    <RefreshCwIcon2></RefreshCwIcon2>
                  ) : (
                    "Cria redirecionamento"
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-6 w-6 transition-all duration-150 group-hover:translate-x-2"
                  >
                    <path d="M10.061 19.061L17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
        <SucessoModal
          open={isModalOpen}
          onClose={handleCloseModal}
          type={modalType}
          message={modalType === "error" ? error : successMessage}
          email={successEmail}
        />
      </div>
    </div>
  );
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
function RefreshCwIcon2(props) {
  return (
    <div>
      <svg
        aria-hidden="true"
        role="status"
        className="inline w-4 h-4 me-3 text-gray-100 animate-spin dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="rgb(4 157 142 / 90%)"
        />
      </svg>
      Criando ...
    </div>
  );
}
function EmailIcon(props) {
  return (
    <svg
      {...props}
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M318.87 187.24C320.68 189.05 321.8 191.55 321.8 194.31V344.48C321.8 350 317.32 354.48 311.8 354.48H88.2C82.68 354.48 78.2 350 78.2 344.48V194.31C78.2 191.71 79.37 189.17 81 187.4"
        stroke="#ffff"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M318.49 186.9L208.62 272.68C203.56 276.63 196.45 276.63 191.39 272.68L81.51 186.9"
        stroke="#ffff"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M144.89 137.41L81.51 186.9"
        stroke="#ffff"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M318.49 186.9L255.11 137.41"
        stroke="#ffff"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M287.41 89.85C287.41 65.36 267.56 45.52 243.08 45.52C222.2 45.52 204.7 59.96 200 79.41C195.3 59.97 177.8 45.52 156.92 45.52C132.43 45.52 112.59 65.37 112.59 89.85C112.59 101.49 117.08 112.08 124.43 119.99L200 184.31L275.58 119.99C282.92 112.08 287.41 101.49 287.41 89.85Z"
        stroke="#000"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
