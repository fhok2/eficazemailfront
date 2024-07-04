import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/services/authService";
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const AlertMessage = ({ message, type = "error" }) => {
  const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";
  const borderColor = type === "error" ? "border-red-500" : "border-green-500";
  const textColor = type === "error" ? "text-red-800" : "text-green-800";
  const Icon = type === "error" ? AlertCircle : CheckCircle;

  return (
    <div className={`p-4 ${bgColor} border-l-4 ${borderColor} rounded-r-lg mt-4`}>
      <div className="flex items-center">
        <Icon className={`w-5 h-5 ${textColor} mr-2`} />
        <p className={`${textColor} text-sm font-medium`}>{message}</p>
      </div>
    </div>
  );
};

const ResetPassword = ({ isVisible, onClose, initialEmail }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  if (!isVisible) return null;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleEnvNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const baseUrl = window.location.origin;
   
    const response = await requestPasswordReset(email, baseUrl);

    if (response.error) {
      setError(response.message);
    } else {
      setSuccessMessage(`Um email de redefinição de senha foi enviado com sucesso. Caso não encontre na caixa de entrada principal, por favor, confira as abas "Promoções" ou "Spam".`);
    }

    setLoading(false);
  };

  const handleClose = () => {
    onClose();
    setLoading(false);
    setEmail("");
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          {successMessage ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="text-xl text-white font-semibold mb-2">Sucesso!</h4>
              <p className="text-gray-300 mb-6">{successMessage}</p>
              <Button
                onClick={handleClose}
                className="px-4 py-2 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Fechar
              </Button>
            </div>
          ) : (
            <>
              <h4 className="text-2xl text-white font-bold mb-4">Recuperar sua senha</h4>
              <p className="text-gray-300 mb-6">Entre com seu email para recuperar sua senha.</p>
              
              <form onSubmit={handleEnvNewPassword}>
                <div className="mb-4">
                  <Label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Digite seu email aqui"
                    required
                    className="w-full bg-gray-700 text-white border-gray-600 focus:ring-2 focus:ring-brand-light"
                  />
                </div>
                
                <p className="text-xs text-gray-400 mb-4">
                  Após a solicitação, verifique seu email. Caso não encontre na
                  caixa de entrada principal, por favor, confira as abas{" "}
                  <span className="underline font-bold">Promoções</span> ou{" "}
                  <span className="underline font-bold">Spam</span>.
                </p>

                {error && <AlertMessage message={error} type="error" />}

                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    onClick={handleClose}
                    variant="outline"
                    className="px-4 py-2 text-gray-300 hover:bg-gray-700 transition-colors duration-300"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Enviar nova senha"}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;