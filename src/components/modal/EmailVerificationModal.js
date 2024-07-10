import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSpring, animated, config } from "react-spring";
import { useMail } from "@/hooks/useMail";
import { validateMail } from "@/services/emailService";

const NewEmailRequestModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { resendEmailVerification } = useMail();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const backdropSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    config: config.molasses,
  });

  const modalSpring = useSpring({
    transform: isVisible ? "scale(1) translateY(0)" : "scale(0.9) translateY(-50px)",
    opacity: isVisible ? 1 : 0,
    config: { ...config.wobbly, tension: 300, friction: 20 },
  });

  const formSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    delay: 200,
    config: config.gentle,
  });

  const iconSpring = useSpring({
    from: { transform: "scale(0) rotate(-180deg)" },
    to: { transform: "scale(1) rotate(0deg)" },
    delay: 300,
    config: { ...config.wobbly, tension: 300, friction: 10 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const dataValidation=
      {
        email: email,
        baseUrl: window.location.origin
      }
      await validateMail(dataValidation);
      setMessage("Email de verificação reenviado com sucesso!");
      setTimeout(() => {
        //r
        onClose();
        setEmail("");
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("Erro ao reenviar o email de verificação. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setEmail("");
      setMessage("");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <animated.div
        style={backdropSpring}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80"
        onClick={handleModalClose}
      >
        <animated.div
          style={modalSpring}
          className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 relative overflow-y-auto flex-grow">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 animate-pulse"></div>
            <animated.div
              style={iconSpring}
              className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-700 rounded-full mx-auto relative z-10"
            >
              <Mail className="h-8 w-8 text-brand-light" />
            </animated.div>
            <h4 className="text-2xl text-white font-bold mb-3 text-center relative z-10">
              Reenviar Email de Verificação
            </h4>
            <p className="text-gray-300 mb-4 text-center text-sm relative z-10">
              Insira o endereço de e-mail para o qual deseja reenviar o email de verificação.
            </p>
            <animated.form onSubmit={handleSubmit} style={formSpring} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center">
                  Endereço de e-mail <Mail className="h-4 w-4 ml-1 text-brand-light" />
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </animated.form>
          </div>
          <div className="px-6 py-4 bg-gray-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 relative z-10">
            <Button
              onClick={handleModalClose}
              variant="secondary"
              className="w-full sm:w-auto hover:bg-gray-600 transition-colors duration-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full sm:w-auto ${
                isLoading
                  ? "bg-brand-dark-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-dark to-brand-light hover:shadow-lg hover:scale-105"
              } text-white font-semibold transition-all duration-300`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <RefreshCw className="animate-spin h-5 w-5 mr-3" />
                  Reenviando...
                </span>
              ) : (
                "Reenviar Verificação"
              )}
            </Button>
          </div>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center relative z-10 ${
                message.includes("sucesso") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </motion.p>
          )}
        </animated.div>
      </animated.div>
    </AnimatePresence>
  );
};

export default NewEmailRequestModal;