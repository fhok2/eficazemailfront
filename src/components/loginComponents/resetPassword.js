import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from 'react-spring';
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "@/services/authService";
import { ArrowRight, CheckCircle, AlertCircle, Mail, X } from 'lucide-react';

const AlertMessage = ({ message, type = "error" }) => {
  const bgColor = type === "error" ? "bg-red-100" : "bg-green-100";
  const borderColor = type === "error" ? "border-red-500" : "border-green-500";
  const textColor = type === "error" ? "text-red-800" : "text-green-800";
  const Icon = type === "error" ? AlertCircle : CheckCircle;

  const alertSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle
  });

  return (
    <animated.div style={alertSpring} className={`p-4 ${bgColor} border-l-4 ${borderColor} rounded-lg mt-4 shadow-md`}>
      <div className="flex items-center">
        <Icon className={`w-5 h-5 ${textColor} mr-2 flex-shrink-0`} />
        <p className={`${textColor} text-sm font-medium flex-grow`}>{message}</p>
      </div>
    </animated.div>
  );
};

const ResetPassword = ({ isVisible, onClose, initialEmail }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
    }
    setIsModalVisible(isVisible);
  }, [isVisible, initialEmail]);

  const backdropSpring = useSpring({
    opacity: isModalVisible ? 1 : 0,
    config: config.molasses,
  });

  const modalSpring = useSpring({
    transform: isModalVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-50px)',
    opacity: isModalVisible ? 1 : 0,
    config: { ...config.wobbly, tension: 300, friction: 20 },
  });

  const formSpring = useSpring({
    opacity: isModalVisible ? 1 : 0,
    transform: isModalVisible ? 'translateY(0)' : 'translateY(20px)',
    delay: 200,
    config: config.gentle,
  });

  const iconSpring = useSpring({
    from: { transform: 'scale(0) rotate(-180deg)' },
    to: { transform: 'scale(1) rotate(0deg)' },
    delay: 300,
    config: { ...config.wobbly, tension: 300, friction: 10 },
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleEnvNewPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Por favor, insira um endereço de email válido.");
      return;
    }
    setLoading(true);
    const baseUrl = window.location.origin;

    try {
      const response = await requestPasswordReset(email, baseUrl);
      if (response.error) {
        setError(response.message);
      } else {
        setSuccessMessage(`Um email de redefinição de senha foi enviado com sucesso para ${email}. Caso não encontre na caixa de entrada principal, por favor, confira as abas "Promoções" ou "Spam".`);
      }
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
    setTimeout(() => {
      onClose();
      setLoading(false);
      setEmail("");
      setError("");
      setSuccessMessage("");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <animated.div
      style={backdropSpring}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80"
      onClick={handleClose}
    >
      <animated.div
        style={modalSpring}
        className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="reset-password-title"
      >
        <div className="p-6 relative overflow-y-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 animate-pulse"></div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
          <animated.div
            style={iconSpring}
            className="flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-brand-dark to-brand-light rounded-full mx-auto relative z-10 shadow-lg"
          >
            <Mail className="h-10 w-10 text-white" />
          </animated.div>
          <h2 id="reset-password-title" className="text-2xl text-white font-bold mb-3 text-center relative z-10">
            Recuperar sua senha
          </h2>
          <p className="text-gray-300 mb-6 text-center text-sm relative z-10">
            Insira seu email para receber as instruções de redefinição de senha.
          </p>
          {successMessage ? (
            <animated.div style={formSpring} className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-gray-300 mb-6">{successMessage}</p>
              <Button
                onClick={handleClose}
                className="px-6 py-3 bg-gradient-to-r from-brand-dark to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-light focus:ring-opacity-50"
              >
                Fechar
              </Button>
            </animated.div>
          ) : (
            <animated.form style={formSpring} onSubmit={handleEnvNewPassword} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="seu-email@exemplo.com"
                  required
                  className="w-full bg-gray-700 text-white border-gray-600 focus:border-brand-light focus:ring-2 focus:ring-brand-light focus:ring-opacity-50 rounded-lg transition-all duration-200"
                  aria-describedby="email-hint"
                />
                <p id="email-hint" className="text-xs text-gray-400 mt-1">
                  Insira o email associado à sua conta.
                </p>
              </div>
              
              <p className="text-sm text-gray-400 bg-gray-700 p-3 rounded-lg">
                Após a solicitação, verifique seu email. Caso não encontre na
                caixa de entrada principal, por favor, confira as abas{" "}
                <span className="font-semibold text-brand-light">Promoções</span> ou{" "}
                <span className="font-semibold text-brand-light">Spam</span>.
              </p>

              {error && <AlertMessage message={error} type="error" />}

              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="px-4 py-2 text-gray-300 border-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 rounded-lg"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className={`px-6 py-3 ${
                    loading
                      ? "bg-brand-dark-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-brand-dark to-brand-light hover:shadow-lg hover:scale-105"
                  } text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-light focus:ring-opacity-50`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    <>
                      Enviar instruções
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
            </animated.form>
          )}
        </div>
      </animated.div>
    </animated.div>
  );
};

export default ResetPassword;
