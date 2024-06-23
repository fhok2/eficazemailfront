import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { requestPasswordReset } from "@/services/authService";

const AlertMessage = ({message}) => {


  return (
    <div className="py-8 px-6">
      <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
        <div className="flex items-center">
          <span className="inline-block mr-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 15C9.4 15 9 14.6 9 14C9 13.4 9.4 13 10 13C10.6 13 11 13.4 11 14C11 14.6 10.6 15 10 15ZM11 10C11 10.6 10.6 11 10 11C9.4 11 9 10.6 9 10V6C9 5.4 9.4 5 10 5C10.6 5 11 5.4 11 6V10Z"
                fill="#E85444"
              ></path>
            </svg>
          </span>
          <h3 className="text-red-800 font-normal text-xs">
            {message}
          </h3>
         
        </div>
      </div>
    </div>
  );
};


const ResetPassword = ({ isVisible, onClose, initialEmail }) => {
  const [modal, setModal] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para a mensagem de sucesso
  

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  if (!isVisible) return null;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Limpa o erro ao digitar um novo email
  };

  const handleEnvNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const baseUrl = window.location.origin; 
   
    const response = await requestPasswordReset(email,baseUrl);

    if (response.error) {
      setError(response.message);
      
    } else {
      setSuccessMessage(`Um email de redefinição de senha foi enviado com sucesso. Caso não encontre na caixa de entrada principal, por favor, confira as abas "Promoções" ou "Spam".`); // Atualize a mensagem de sucesso
    }

    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    setLoading(false);
    setEmail(""); // Limpa o estado do email ao fechar o modal
    setError(""); // Limpa o erro ao fechar o modal
    setSuccessMessage(""); // Limpa a mensagem de sucesso ao fechar o modal
  };

  return (
    <div
      className={`${
        initialEmail ? "" : "hidden"
      } z-50 fixed top-0 left-0 right-0 bottom-0 flex items-center w-full h-full p-4 bg-gray-800 bg-opacity-80 overflow-y-auto`}
    >
      <div className="max-w-xl w-full mx-auto bg-gray-500 rounded-xl overflow-hidden">
        <div className="max-w-md mx-auto pt-12 pb-4  px-5 text-center">
          {successMessage ? (
            <div className="text-center text-green-500">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-gray-600 rounded-full">
                <svg className="h-8 w-8 text-green-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3"/>
                </svg>
              </div>
              <h4 className="text-xl text-gray-100 font-semibold mb-5">Sucesso!</h4>
              <p className="text-gray-300 font-medium">{successMessage}</p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-12 h-12 mb-5 bg-gray-600 rounded-full">
                <svg className="h-8 w-8 text-green-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                  <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3"/>
                </svg>
              </div>
              <h4 className="text-xl text-gray-100 font-semibold mb-5">Recuperar sua senha!</h4>
              <p className="text-gray-300 font-medium">Entre com seu email para recuperar sua senha.</p>
              
              <div className="relative w-full h-14 mt-10 py-4 px-3 mb-10 border border-gray-400 focus-within:border-primary rounded-lg">
                <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-gray-500">Email</span>
                <input
                  className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium "
                  id="modalInput7-1"
                  type="email"
                  value={email}
                  required
                  placeholder="Digite seu email aqui"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="py-3 text-gray-600 text-center">
                <p className="text-xs text-gray-300">
                  Após a solicitação, verifique seu email. Caso não encontre na
                  caixa de entrada principal, por favor, confira as abas{" "}
                  <span className="underline font-bold">Promoções</span> ou{" "}
                  <span className="underline font-bold">Spam</span>.
                </p>
              </div>
              {error && <AlertMessage message={error} />}
            </>
          )}
        </div>
        <div className="pt-5 pb-6 px-6 text-right bg-gray-600 -mb-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="w-full sm:w-auto py-3 px-5 mb-2 mr-4 text-center font-semibold leading-6 text-gray-400 rounded-lg transition duration-200"
          >
            
            {successMessage ? "OK entendi!" : "Cancelar"}
            
          </Button>
          {!successMessage && (
            <Button
              onClick={handleEnvNewPassword}
              variant="link2"
              className="w-full sm:w-auto py-3 px-5 text-center font-semibold leading-6 text-blue-50 rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar nova senha"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
