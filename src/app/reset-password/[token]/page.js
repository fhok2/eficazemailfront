'use client'
import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import AnimatedBackground from "@/components/AnimatedBackground";
import { useRouter } from "next/navigation";
import { resetPassword } from "@/services/authService";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PasswordReset = ({ token }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

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

  const shakeAnimation = useSpring({
    from: { x: 0 },
    to: async (next) => {
      await next({ x: -10 });
      await next({ x: 10 });
      await next({ x: -10 });
      await next({ x: 10 });
      await next({ x: 0 });
    },
    config: { tension: 300, friction: 10 },
    reset: true,
  });

  useEffect(() => {
    if (error) {
      shakeAnimation.start();
    }
  }, [error, shakeAnimation]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setFormData(prev => ({ ...prev, [name]: trimmedValue }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, formData.password);
      if (response.error) {
        setError(response.message);
      } else {
        setSuccess(true);
        setTimeout(() => router.push("/login"), 3000);
      }
    } catch (error) {
      setError("Ocorreu um erro ao redefinir a senha. Tente novamente.");
    }
    
    setLoading(false);
  };

  const renderFormField = (field, type = "password") => (
    <div key={field} className="form-group relative">
      <Label 
        className={`absolute left-10 text-sm font-semibold transition-all duration-300 ${
          focusedField === field || formData[field]
            ? 'top-1 text-xs text-teal-300'
            : 'top-1/2 -translate-y-1/2 text-gray-400'
        }`}
        htmlFor={field}
      >
        {field === "password" ? "Nova senha" : "Confirmar senha"}
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
          <Lock size={18} />
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
              Redefinir Senha
            </span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">
            Digite sua nova senha abaixo
          </p>
          {error && (
            <animated.div style={shakeAnimation}>
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </animated.div>
          )}
          {success && (
            <animated.div style={fadeIn}>
              <Alert variant="success" className="mb-6">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Sucesso</AlertTitle>
                <AlertDescription>
                  Senha redefinida com sucesso! Redirecionando para o login...
                </AlertDescription>
              </Alert>
            </animated.div>
          )}
          <animated.form onSubmit={handleSubmit} className="space-y-6 mt-8" style={fadeIn}>
            {renderFormField("password")}
            {renderFormField("confirmPassword")}
            <animated.div style={buttonAnimation}>
              <Button 
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
              >
                {loading ? "Processando..." : "Criar nova senha"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </animated.div>
          </animated.form>
        </animated.div>
      </div>
    </>
  );
};

export default PasswordReset;