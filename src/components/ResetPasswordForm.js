"use client";

import { useState, useCallback } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";

const SucessoMessage = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }} // Inicia da direita
        animate={{ x: 50, opacity: 1 }} // Anima para o centro
        exit={{
          x: -100, // Sai para a esquerda
          opacity: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.5,
        }}
        className="fixed top-14 right-8 z-50"
      >
        <div className="px-6 py-5 bg-gray-50 rounded-3xl opacity-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-auto">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="28" height="28" rx="14" fill="#24B428"></rect>
                <path
                  d="M11.8746 18.3313C11.534 18.3315 11.2073 18.1961 10.9666 17.955L8.22153 15.2109C7.92616 14.9155 7.92616 14.4365 8.22153 14.141C8.517 13.8457 8.99595 13.8457 9.29142 14.141L11.8746 16.7242L18.7086 9.89023C19.004 9.59486 19.483 9.59486 19.7785 9.89023C20.0738 10.1857 20.0738 10.6647 19.7785 10.9601L12.7826 17.955C12.5419 18.1961 12.2152 18.3315 11.8746 18.3313Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <p className="flex-1 text-xs font-medium text-gray-700">
              Senha atualizada com sucesso.
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
const ErrorMessage = ({message}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }} // Inicia da direita
        animate={{ x: 50, opacity: 1 }} // Anima para o centro
        exit={{
          x: -100, // Sai para a esquerda
          opacity: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.5,
        }}
        className="fixed top-14 right-8 z-50"
      >
        <div className="px-6 py-5 bg-gray-50 rounded-3xl opacity-50">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-auto">
              <svg
                class="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="flex-1 text-xs font-medium text-gray-700">
              {message}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function ResetPasswordForm({ token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);
  const[serverMessage, setServerMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setMessage("");
      setErro(false);

      if (password.length < 8) {
        setMessage("A senha deve ter pelo menos 8 caracteres.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("As senhas não coincidem.");
        return;
      }

      setIsSubmitting(true);
      const response = await resetPassword(token, password);
      setIsSubmitting(false);

      if (response.error) {
        setErro(true);
        setServerMessage(response.message)
      } else {
        setSucesso(true);
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => router.push("/login"), 3000);
      }
    },
    [password, confirmPassword, token, resetPassword, router]
  );

  return (
    <section className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && <p className="text-red-500">{message}</p>}
        {sucesso && <SucessoMessage />}
        {erro && (
          <ErrorMessage message={serverMessage} />
        )}
        <div className="relative w-full h-14 mt-10 py-4 px-3 mb-10 border border-gray-400 focus-within:border-primary rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-custom-bg">
            Nova senha
          </span>
          <input
            className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium "
            id="modalInput7-1"
            type="password"
            value={password}
            required
            placeholder="Digite sua nova senha aqui"
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage("");
            }}
          />
        </div>
        <div className="relative  w-full h-14 mt-10 py-4 px-3 mb-10 border border-gray-400 focus-within:border-primary rounded-lg">
          <span className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-custom-bg">
            Confirmar senha
          </span>
          <input
            className="block w-full outline-none bg-transparent text-sm text-gray-100 font-medium "
            id="modalInput7-1"
            type="password"
            value={confirmPassword}
            required
            placeholder="Digite sua nova senha aqui"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMessage("");
            }}
          />
          
        </div>
       
        <div>
          <Button
            variant="link2"
            className="w-full mt-10 sm:w-auto py-6 px-5 text-center font-semibold leading-6 text-blue-50 rounded-lg transition duration-200 mx-auto flex"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processando..." : "Criar nova senha"}
          </Button>
        </div>
      </form>
      
    </section>
  );
}
