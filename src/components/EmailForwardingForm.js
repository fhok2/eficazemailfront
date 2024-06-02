"use client";
import React, { useState } from "react";
import { forwardEmail } from "@/services/emailService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SucessoModal from "@/components/component/sucessoModal";

export default function EmailForwardingForm() {
  const [email, setEmail] = useState("");
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
    navigator.clipboard.writeText(successEmail).then(() => {
      setCopied(true);
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  };

  const handleGenerateRandomName = () => {
    const randomNumber = new Date().getMilliseconds(); 

    if(email){
        const emailUser = email.replace(/@.*/, '');
        const userEmailCustom = emailUser + randomNumber;
        setCustomName(userEmailCustom);
    } else {
        const baseEmail = "eficazmail";
        const randomEmail =  baseEmail + randomNumber;
        setCustomName(randomEmail);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || (!customName && !generateRandomName)) {
      setError("Por favor, insira um endereço de e-mail válido e um nome personalizado ou escolha gerar um nome aleatório");
      setModalType("error");
      setIsModalOpen(true);
      return;
    } 
    
    if (email.includes('@eficaz.email')) {
      setError("Endereço de e-mail não pode ser @eficaz.email");
      setEmail("");
      setModalType("error");
      setIsModalOpen(true);
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      const finalCustomName = generateRandomName ? customName : `${customName}@eficaz.email`;

      const response = await forwardEmail({
        userEmail: email,
        customName: finalCustomName,
      });

      setSuccessMessage(`Email encaminhado com sucesso para ${response.data.address}`);
      setSuccessEmail(response.data.address);
      setCustomName("");
      setGenerateRandomName(false);
      setCopied(false);  // Reset the copied state
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
    <div>
       <div className="space-y-2 text-center mb-10">
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Crie seu redirecionamento grátis</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Informe seu email principal e crie um email de redirecionamento.
            </p>
          </div>
      <div className="w-11/12  bg-black max-w-4xl mx-auto  px-8 py-12 md:px-6 md:py-16 border border-border rounded-lg">
      
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
      
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="primary-email">Email principal</Label>
                <Input
                  className="mt-2"
                  id="primary-email"
                  placeholder="Informe seu email principal"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="custom-email">Crie seu email de redirecionamento</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    id="custom-email"
                    pattern="^[a-zA-Z0-9]+$"
                    placeholder="Email personalizado"
                    title="Por favor, insira um prefixo de email válido usando apenas letras e números"
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    disabled={generateRandomName}
                  />
                  <span className="text-gray-500 dark:text-gray-400">@eficaz.email</span>
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
              </div>
              <Button variant="link2" className="w-full" type="submit" disabled={loading}>
                <EmailIcon className="h-6 w-6 mr-2" />
                {loading ? "Criando..." : "Criar redirecionamento"}
              </Button>
            </form>
          </div>
          <div className="bg-gray-50 h-[200px] sm:h-[210px] md-h[200px] lg-h[200px] xl-h[200px] rounded-xl p-6 md:p-8  m-auto  ">
            <div className="space-y-4">
              <div className="space-y-4 flex flex-col justify-center items-center py-auto ">
                <h2 className="text-xl font-bold text-gray-950 tracking-tight">O que é isso?</h2>
                <p className="text-gray-800 text-[12px] sm:text-md md:text-md lg:text-md xl:text-md ">
                  O redirecionamento cria um email secundário ligado ao seu email principal. Todos os emails recebidos neste email secundário são direcionados automaticamente para o seu email principal. Nenhuma copia de email fica guaradado em nossos servidores.
                </p>
              </div>
      
            </div>
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