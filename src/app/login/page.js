'use client'
import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight, User, Mail, Phone, Lock, Loader, AlertCircle } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground";
import ResetPassword from "@/components/loginComponents/resetPassword";
import DDDs from "@/enums/ddds";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

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

  const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/;

  const handleNameBlur = (e) => {
    const { value } = e.target;
    const trimmedValue = value.trim();
    setFormData(prev => ({ ...prev, name: trimmedValue }));
    validateName(trimmedValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;
  
    if (name === 'email') {
      finalValue = value.trim().toLowerCase();
    } else if (name === 'name') {
      validateName(value);
    } else if (name === 'phone') {
      finalValue = value.replace(/\D/g, '').slice(0, 11);
      validatePhone(finalValue);
    } else {
      finalValue = value.trim();
    }
  
    setFormData(prev => ({ ...prev, [name]: finalValue }));
    setError("");
    if (name === "email") setIsEmailVerified(false);
  };

  const validateName = (name) => {
    if (!nameRegex.test(name)) {
      setNameError("Por favor, digite nome e sobrenome válidos");
    } else {
      setNameError("");
    }
  };

  const validatePhone = (phone) => {
    if (phone.length !== 11) {
      setPhoneError("Ops! Parece que seu número está incompleto. Lembre-se: são 11 dígitos, incluindo o DDD.");
    } else {
      const ddd = phone.slice(0, 2);
      if (!DDDs.includes(ddd)) {
        setPhoneError("Hmm, esse DDD não parece familiar. Que tal conferir se digitou corretamente?");
      } else {
        setPhoneError("");
      }
    }
  };
  
  const handlePhoneBlur = () => {
    validatePhone(formData.phone);
    setShowPhoneError(true);
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
    if (isRegistering && (nameError || phoneError)) {
      setError("Ops! Parece que temos alguns detalhes para ajustar. Vamos dar uma olhada nos campos destacados?");
      return;
    }
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
      setTimeout(() => {
        window.location.reload();
        setLoading(false);
      }, 1000);
    }
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
    <div key={field} className="form-group relative mb-6">
      <Label 
        className={`absolute left-10 text-sm font-semibold transition-all duration-300 ${
          focusedField === field || formData[field]
            ? 'top-1 text-xs text-teal-300'
            : 'top-1/2 -translate-y-1/2 text-gray-400'
        }`}
        htmlFor={field}
      >
        {field === 'name' ? 'Nome e Sobrenome' : field === 'phone' ? 'Telefone' : field.charAt(0).toUpperCase() + field.slice(1)}
      </Label>
      <div className="relative">
        <Input
          type={type}
          id={field}
          name={field}
          value={formData[field]}
          onChange={handleInputChange}
          onFocus={() => setFocusedField(field)}
          onBlur={field === 'name' ? handleNameBlur : field === 'phone' ? handlePhoneBlur : () => setFocusedField(null)}
          required
          className="mt-1 bg-gray-800 bg-opacity-50 text-white border-gray-700 rounded-lg py-8 pl-12 w-full focus:ring-2 focus:ring-brand-light transition-all duration-300 placeholder-transparent"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {getIcon(field)}
        </span>
      </div>
      {field === 'name' && nameError && (
        <p className="text-red-500 text-xs mt-1">{nameError}</p>
      )}
      {field === 'phone' && showPhoneError && phoneError && (
        <animated.div 
          style={fadeIn} 
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mt-2"
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{phoneError}</p>
          </div>
        </animated.div>
      )}
    </div>
  );

  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col justify-center items-center px-4 py-20 bg-transparent text-white relative z-10 min-h-screen">
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
                disabled={loading || (isRegistering && (nameError || phoneError))}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
              >
                {loading ? <div className="flex gap-3 items-center">
                  <Loader className="h-6 w-6 animate-spin text-white"  />  
                  Carregando ...
                </div>: isRegistering ? "Criar conta" : isEmailVerified ? <div
                className="flex items-center">
                  Entrar
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></div> :  <div
                className="flex items-center">
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" /></div>}
              </Button>
            </animated.div>
          </animated.form>
          <animated.div className="mt-6 text-center" style={fadeIn}>
            {!isRegistering && isEmailVerified && (
              <button
                onClick={() => setModalVisible(true)}
                className="text-sm font-semibold text-teal-300 hover:text-teal-400 focus:outline-none"
              >
                Esqueceu sua senha?
              </button>
            )}
            {isRegistering && (
              <p className="text-sm font-medium text-gray-400 mt-4">
                Já possui uma conta?{" "}
                <button
                  onClick={() => {
                    setIsRegistering(false);
                    setIsEmailVerified(false);
                    setFormData({ email: "", password: "", name: "", phone: "" });
                  }}
                  className="text-teal-300 hover:text-teal-400 focus:outline-none font-semibold"
                >
                  Entrar
                </button>
              </p>
            )}
          </animated.div>
        </animated.div>
        {isModalVisible && <ResetPassword onClose={() => setModalVisible(false)} />}
      </div>
    </>
  );
};

export default LoginPage;