
'use client'
import React, { useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import UserRegistration from "@/components/loginComponents/UserRegistration";
import ResetPassword from "@/components/loginComponents/resetPassword";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isNotRegistered, setIsNotRegistered] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { handleLogin, handleCheckEmail, redirectToDashboardIfAuthenticated } = useAuthContext();

  useEffect(() => {
    redirectToDashboardIfAuthenticated();
  }, [redirectToDashboardIfAuthenticated]);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.gentle,
  });

  const buttonAnimation = useSpring({
    from: { scale: 1, boxShadow: '0 0 0 rgba(4, 157, 142, 0)' },
    to: { scale: 1.02, boxShadow: '0 4px 20px rgba(4, 157, 142, 0.3)' },
    config: { tension: 300, friction: 10 },
  });

  const emailToPasswordTransition = useSpring({
    opacity: isEmailVerified ? 1 : 0,
    transform: isEmailVerified ? 'translateY(0px)' : 'translateY(20px)',
    config: config.gentle,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toLowerCase() }));
    setError("");
    if (name === "email") setIsEmailVerified(false);
  };

  const checkEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await handleCheckEmail(formData.email);
    
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
    e.preventDefault();
    if (!isEmailVerified) {
      setError("Por favor, verifique seu e-mail antes de fazer login.");
      return;
    }
    setLoading(true);
    const response = await handleLogin(formData);
    
    if (response.error) {
      setError(response.message);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  const renderForm = () => (
    <animated.form onSubmit={isEmailVerified ? handleSubmit : checkEmail} className="space-y-6 mt-8" style={fadeIn}>
      {!isNotRegistered && (
        <div className="form-group relative">
          <Label className="sr-only" htmlFor="email-login">Email</Label>
          <Input
            id="email-login"
            name="email"
            type="email"
            placeholder="Digite seu email aqui"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 bg-gray-800 bg-opacity-50 text-white placeholder-gray-500 border-gray-700 rounded-lg py- px-4 w-full focus:ring-2 focus:ring-brand-light transition-all duration-300"
          />
        </div>
      )}
      <animated.div style={emailToPasswordTransition}>
        {isEmailVerified && (
          <div className="form-group relative">
            <Label className="sr-only" htmlFor="password-login">Senha</Label>
            <Input
              id="password-login"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 bg-gray-800 bg-opacity-50 text-white placeholder-gray-500 border-gray-700 rounded-lg py-3 px-4 w-full focus:ring-2 focus:ring-brand-light transition-all duration-300"
            />
          </div>
        )}
      </animated.div>
      {!isNotRegistered && (
        <animated.div style={buttonAnimation}>
          <Button 
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
          >
            {loading ? "Carregando..." : isEmailVerified ? "Entrar" : "Continuar"}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </animated.div>
      )}
    </animated.form>
  );

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-transparent text-white relative z-10">
        <animated.div className="w-full max-w-md" style={fadeIn}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              Acesse sua conta
            </span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">
            Proteja sua privacidade online com EficazMail
          </p>
          {error && (
            <animated.div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert" style={fadeIn}>
              <p>{error}</p>
            </animated.div>
          )}
          {isNotRegistered ? (
  <UserRegistration 
    email={formData.email} 
    onBackToLogin={() => setIsNotRegistered(false)}
  />
) : renderForm()}
          {isEmailVerified && (
            <p className="mt-6 text-sm text-center text-gray-300">
              Esqueceu a senha?{" "}
              <button
                onClick={() => setModalVisible(true)}
                className="text-teal-200 hover:text-teal-400 underline font-medium transition-colors duration-150"
              >
                Enviar nova senha
              </button>
            </p>
          )}
        </animated.div>
        <ResetPassword
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          initialEmail={formData.email}
        />
      </div>
    </>
  );
};

export default LoginPage;