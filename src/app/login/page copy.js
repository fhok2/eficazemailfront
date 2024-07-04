'use client'
import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight, User, Mail, Phone, Lock } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground";
import ResetPassword from "@/components/loginComponents/resetPassword";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const { handleLogin, handleRegister, handleCheckEmail, redirectToDashboardIfAuthenticated } = useAuthContext();

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
        setIsRegistering(true);
        setIsEmailVerified(false);
      } else {
        setError(response.message);
        setIsEmailVerified(false);
      }
    } else {
      setIsEmailVerified(true);
      setIsRegistering(false);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let response;

    if (isRegistering) {
      response = await handleRegister(formData);
    } else {
      response = await handleLogin(formData);
    }
    
    if (response.error) {
      setError(response.message);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  const getIcon = (field) => {
    switch(field) {
      case 'name': return <User size={18} />;
      case 'email': return <Mail size={18} />;
      case 'phone': return <Phone size={18} />;
      case 'password': return <Lock size={18} />;
      default: return null;
    }
  };

  const renderFormField = (field, type = "text") => (
    <div key={field} className="form-group relative">
      <Label 
        className={`absolute left-10 text-sm font-semibold transition-all duration-300 ${
          focusedField === field || formData[field]
            ? 'top-1 text-xs text-teal-300'
            : 'top-1/2 -translate-y-1/2 text-gray-400'
        }`}
        htmlFor={field}
      >
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </Label>
      <div className="relative">
        <Input
          type={type}
          id={field}
          name={field}
          value={formData[field]}
          onChange={handleInputChange}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField(null)}
          required
          className="mt-1 bg-gray-800 bg-opacity-50 text-white border-gray-700 rounded-lg py-8 pl-12 w-full focus:ring-2 focus:ring-brand-light transition-all duration-300 placeholder-transparent"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {getIcon(field)}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col justify-center items-center px-4 py-20 bg-transparent text-white relative z-10">
        <animated.div className="w-full max-w-md" style={fadeIn}>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              {isRegistering ? "Criar nova conta" : "Acesse sua conta"}
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
          <animated.form onSubmit={isEmailVerified || isRegistering ? handleSubmit : checkEmail} className="space-y-6 mt-8" style={fadeIn}>
            {renderFormField("email")}
            {isEmailVerified && renderFormField("password", "password")}
            {isRegistering && (
              <>
                {renderFormField("name")}
                {renderFormField("phone")}
                {renderFormField("password", "password")}
              </>
            )}
            <animated.div style={buttonAnimation}>
              <Button 
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
              >
                {loading ? "Carregando..." : isRegistering ? "Criar conta" : isEmailVerified ? "Entrar" : "Continuar"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </animated.div>
          </animated.form>
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
          {isRegistering && (
            <p className="mt-4 text-sm text-center text-gray-400">
              Já tem uma conta?{" "}
              <button
                onClick={() => {
                  setIsRegistering(false);
                  setIsEmailVerified(false);
                  setFormData({email: "", password: "", name: "", phone: ""});
                }}
                className="text-teal-300 hover:text-teal-200 underline font-medium transition-colors duration-150"
              >
                Faça login
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