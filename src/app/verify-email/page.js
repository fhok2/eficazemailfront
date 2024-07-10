"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw, Mail } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useSearchParams } from 'next/navigation';
import { verifyMail } from "@/services/emailService";
import EmailVerificationModal from "@/components/modal/EmailVerificationModal";


const EmailValidationPage = () => {
  const [validationStatus, setValidationStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleVerification = async () => {
    if (!token) {
      setValidationStatus("error");
      setMessage("Token não fornecido");
      return;
    }

    try {
      setValidationStatus("loading");
      const response = await verifyMail({ token });
      if (response.status === "success") {
        setValidationStatus("success");
        setMessage(response.message);
      } else {
        setValidationStatus("error");
        setMessage(response.message);
      }
    } catch (err) {
      setValidationStatus("error");
      setMessage(err.message);
    }
  };



  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col justify-center items-center px-4 py-20 bg-transparent text-teal-800 relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background-secondary p-8 rounded-lg shadow-xl max-w-md w-full"
        >
          <h2 className="text-2xl text-center mb-4">
            {validationStatus === "idle" && "Pronto para validar seu e-mail"}
            {validationStatus === "loading" && "Validando seu e-mail..."}
            {validationStatus === "success" && "E-mail validado com sucesso!"}
            {validationStatus === "error" && "Erro ao validar seu e-mail."}
          </h2>

          {validationStatus === "idle" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center mb-4"
            >
              <motion.button
                onClick={handleVerification}
                className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 mb-4 mt-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Mail className="mr-2" size={24} />
                  <span>Validar E-mail</span>
                </motion.div>
              </motion.button>
             
            </motion.div>
          )}

          {validationStatus === "loading" && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="flex justify-center mb-4"
            >
              <RefreshCw size={48} className="text-primary" />
            </motion.div>
          )}

          {validationStatus === "success" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex flex-col items-center mb-4"
            >
              <CheckCircle size={48} className="text-primary mb-2 mt-10" />
              <p className="text-text-main text-lg mb-4 mt-4">{message}</p>
            </motion.div>
          )}

          {validationStatus === "error" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex flex-col items-center mb-4"
            >
              <XCircle size={48} className="text-destructive mb-2" />
              <p className="text-text-main text-lg mb-4 mt-10">{message}</p>
              {message !== "Email já verificado" && (
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Solicitar novo link de verificação
                </motion.button>
              )}
            </motion.div>
          )}

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {validationStatus === "idle" && (
              <p className="text-text-secondary text-sm">
                Clique no botão acima para iniciar a validação do seu email.
              </p>
            )}
            {validationStatus === "loading" && (
              <p className="text-text-secondary text-sm">
                Aguarde enquanto validamos seu email...
              </p>
            )}
            {validationStatus === "success" && (
              <p className="text-text-secondary text-sm">
                {message}
              </p>
            )}
            {validationStatus === "error" && (
              <p className="text-text-secondary text-sm">
                {message !== "Email já verificado" 
                  ? "Se o erro persistir, tente solicitar um novo link de verificação."
                  : "Seu email já foi verificado anteriormente. Você pode continuar usando sua conta normalmente."}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      <EmailVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        
      />
    </>
  );
};

export default EmailValidationPage;