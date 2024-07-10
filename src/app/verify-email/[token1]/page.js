"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useParams } from 'next/navigation';
import { verifyMail } from "@/services/emailService";

const EmailValidationPage = () => {
  const [validationStatus, setValidationStatus] = useState("idle");
  const [error, setError] = useState(null);
  const params = useParams();
  const token = params.token;

  const handleVerification = async () => {
    try {
      setValidationStatus("loading");
      console.log("Iniciando verificação de email:", token);
      
      // Descomente a linha abaixo quando estiver pronto para usar a API real
      const response = await verifyMail({ token });
      
      // Simulação da resposta da API para teste
    
      
      console.log("Resultado da verificação:", response);
      setValidationStatus(response.success ? "success" : "error");
    } catch (err) {
      console.error("Erro na verificação:", err);
      setValidationStatus("error");
      setError(err.message);
    }
  };

  const handleResendEmail = () => {
    setValidationStatus("loading");
    // Simule o reenvio com um timeout
    setTimeout(() => {
      // Aqui você chamaria a API real de reenvio
      const success = Math.random() > 0.5;
      setValidationStatus(success ? "success" : "error");
    }, 3000);
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
            {validationStatus === "idle" && "Clique para validar seu e-mail"}
            {validationStatus === "loading" && "Validando seu e-mail..."}
            {validationStatus === "success" && "E-mail validado com sucesso!"}
            {validationStatus === "error" && "Erro ao validar seu e-mail."}
          </h2>

          {validationStatus === "idle" && (
            <motion.div className="flex justify-center mb-4 mt-10">
              <button
                onClick={handleVerification}
                className="bg-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Validar E-mail
              </button>
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
              <p className="text-text-main text-lg mb-4 mt-10">
                Ops! Ocorreu um erro ao validar seu e-mail.
              </p>
              <button
                onClick={handleResendEmail}
                className="bg-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                Reenviar email de validação
              </button>
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
                Seu email foi validado com sucesso! Você já pode continuar.
              </p>
            )}
            {validationStatus === "error" && (
              <p className="text-text-secondary text-sm">
                {error || "Se o erro persistir, tente reenviar o email de validação."}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default EmailValidationPage;