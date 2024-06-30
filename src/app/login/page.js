"use client";
import NewUserLogin from "@/components/loginComponents/newUserLogin";
import ResetPassword from "@/components/loginComponents/resetPassword";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";

import React, { useEffect, useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    handleLogin,
    handleCheckEmail,
    redirectToDashboardIfAuthenticated,
   
  } = useAuthContext();

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    
  };

  useEffect(() => {
    redirectToDashboardIfAuthenticated();
  }, [redirectToDashboardIfAuthenticated]);

  const checkEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await handleCheckEmail(email);
  
  
    if (response.error) {
      if (response.message === "E-mail não registrado.") {
        setIsNotRegistered(true);
        setIsEmailVerified(false);
      } else {
        setError(response.message);
        setIsEmailVerified(false);
      }
    } else {
      setIsEmailVerified(true);
      setIsNotRegistered(false);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    console.log('Submitting form');
    e.preventDefault();
    setLoading(true);
    const credentials = {
      email,
      password,
    };

    if (!isEmailVerified) {
      setError("Por favor, verifique seu e-mail antes de fazer login.");
      setLoading(false);
      return;
    }

    const response = await handleLogin(credentials);
    
    if (response.error) {
      setLoading(false);
      setError(response.message);
    } else {
      window.location.href = "/dashboard";
      
    }
  };



  return (
    <div className="flex flex-col justify-between" style={{ flexGrow: 1 }}>
      <main className="mb-auto">
        <div className="h-full sm:min-h-[calc(100vh-140px)] md:min-h-[calc(100vh-140px)] lg:min-h-[calc(100vh-140px)] xl:min-h-[calc(100vh-140px)] min-h-[calc(100vh-170px)]">
          <div className="translate-x-1/5 absolute left-1/2 top-[15%] -z-10 hidden opacity-[20%] blur-3xl xl:block">
            <svg
              width="389"
              height="337"
              viewBox="0 0 389 337"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M146.401 335.921C57.648 327.067 -7.12309 247.94 1.73118 159.187C10.5855 70.4334 89.7121 5.66237 178.466 14.5166C267.219 23.3709 396.534 -40.803 387.68 47.9504C378.826 136.704 235.155 344.775 146.401 335.921Z"
                fill="#6A9FCB"
              ></path>
            </svg>
          </div>
          <div className="-translate-x-1/5 absolute left-[30%] top-1/4 -z-10 hidden opacity-[40%] blur-3xl sm:block">
            <svg
              width="354"
              height="374"
              viewBox="0 0 354 374"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M353.664 212.472C353.664 301.666 281.358 373.972 192.164 373.972C102.97 373.972 30.6639 301.666 30.6639 212.472C30.6639 123.278 -46.0301 0.971924 43.1638 0.971924C132.358 0.971924 353.664 123.278 353.664 212.472Z"
                fill="#09B6A2"
                fillOpacity="0.45"
              ></path>
            </svg>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex h-full flex-1 flex-col px-4 pt-8 text-center md:max-w-[500px]">
              <h1
                className="gradient-text text-center font-semibold leading-10 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl"
                style={{
                  backgroundImage:
                    "linear-gradient(105deg, rgb(223, 223, 223) 39.15%, rgba(223, 223, 223, 0.67) 80.99%, rgba(223, 223, 223, 0) 119.58%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Acesse sua conta <br /> EficazMail
              </h1>

              <div className="my-4 flex flex-row items-center opacity-30">
                <hr className="flex-1" />
                <span className=" text-xs tracking-wider"></span>
                <hr className="flex-1" />
              </div>
              <div className="flex flex-col w-9/12 mx-auto">
                {error && (
                  <div
                    className="bg-red-100 border-l-4 border-red-500 mt-3 text-red-700 p-4 rounded-lg"
                    role="alert"
                  >
                    <p>{error}</p>
                  </div>
                )}

                <form
                  onSubmit={isEmailVerified ? handleSubmit : checkEmail}
                  className="space-y-6 mt-10"
                >
                  {!isNotRegistered && (
                    <div className="form-group flex relative -space-y-px">
                      
                      <Label className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-custom-bg " htmlFor="primary-email">
                        Email{" "}
                      </Label>
                      
                      <Input
                        className="mt-2 text-gray-50"
                        id="email-login"
                        placeholder="Digite seu email aqui"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value.toLowerCase());
                          setError("");
                          setIsEmailVerified(false);
                        }}
                      />
                    </div>
                    
                  )}
                  {isEmailVerified && (
                    <div className="form-group  flex relative -space-y-px">
                      
                    <Label className="absolute bottom-full left-0 ml-3 -mb-1 transform translate-y-0.5 text-xs font-semibold text-gray-300 px-1 bg-custom-bg " htmlFor="primary-email">
                      Senha{" "}
                    </Label>
                      <Input
                        className="mt-2 text-gray-50"
                        id="password-login"
                        placeholder="Digite sua senha"
                        required
                        type="password"
                        value={password}
                        name="password"
                        aria-autocomplete="list"
                        onChange={(e) => {
                          setPassword(e.target.value.toLowerCase());
                          setError("");
                        }}
                      />
                    </div>
                  )}
                  {!isNotRegistered && (
                    <button className="font-semibold flex items-center justify-center rounded transition duration-100 ease-in-out focus:outline-none 
                    h-14 bg-brand-dark focus:ring-1 focus:ring-white text-white hover:bg-brand-dark-600 disabled:border-gray-100 disabled:bg-gray-300  px-3 py-2 text-sm group w-full focus:ring-primary-700">
                      <span className="">
                        {loading
                          ? "Carregando..."
                          : isEmailVerified
                          ? "Entrar"
                          : "Continuar"}
                      </span>
                    </button>
                  )}
                  {/* {isEmailVerified && (
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={loading}
                    >
                      {loading ? "Entrando..." : "Entrar"}
                    </button>
                  )} */}
                </form>
                {isNotRegistered && <NewUserLogin email={email} />}
              </div>

              {isEmailVerified && (
                <p className="mt-4 text-sm text-gray-300">
                  Não lembra ou <br/>Esqueceu a senha?{" "}
                  <a
                    onClick={handleOpenModal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer underline font-medium hover:border-brand-light text-brand-dark hover:text-brand-dark-600 transition-all duration-150"
                  >
                    Enviar nova senha
                  </a>
                  .
                </p>
                
              )}
            </div>
          </div>
        </div>
        <ResetPassword
         isVisible={isModalVisible}
         onClose={handleCloseModal}
         initialEmail={email}
        />
      </main>
    </div>
  );
};

export default LoginPage;
