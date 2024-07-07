import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight, User, Mail, Phone, Lock } from 'lucide-react';

const UserRegistration = ({ email, onBackToLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { handleRegister } = useAuthContext();

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

  useEffect(() => {
    setFormData(prev => ({ ...prev, email: email ? email.trim().toLowerCase() : "" }));
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue;

    switch (name) {
      case 'name':
        processedValue = value.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
        validateName(processedValue);
        break;
      case 'email':
        processedValue = value.replace(/\s/g, '').toLowerCase();
        break;
      case 'phone':
        // Aceitar apenas números
        processedValue = value.replace(/\D/g, '');
        break;
      case 'password':
        processedValue = value.trim();
        break;
      default:
        processedValue = value;
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    setError("");
  };

  const validateName = (name) => {
    const nameParts = name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setNameError("Por favor, digite nome e sobrenome");
    } else {
      setNameError("");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (nameError) {
      setError("Por favor, corrija os erros no formulário antes de continuar.");
      return;
    }
    setLoading(true);
    const response = await handleRegister(formData);
    setLoading(false);
    
    if (response.error) {
      setError(response.message);
    } else {
      window.location.href = "/dashboard";
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

  return (
    <animated.div style={fadeIn}>
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Criar nova conta
      </h2>
      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        {error && (
          <animated.div 
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"
            role="alert"
            style={fadeIn}
          >
            <p>{error}</p>
          </animated.div>
        )}
        {["name", "email", "phone", "password"].map((field) => (
          <div key={field} className="form-group relative">
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
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
                required
                className="mt-1 bg-gray-800 bg-opacity-50 text-white border-gray-700 rounded-lg py-6 pl-12 w-full focus:ring-2 focus:ring-brand-light transition-all duration-300 placeholder-transparent"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {getIcon(field)}
              </span>
            </div>
            {field === 'name' && nameError && (
              <p className="text-red-500 text-xs mt-1">{nameError}</p>
            )}
          </div>
        ))}
        <animated.div style={buttonAnimation}>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
            disabled={loading || nameError}
          >
            {loading ? "Registrando..." : "Criar conta"}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </animated.div>
      </form>
      <p className="mt-4 text-sm text-center text-gray-400">
        Já tem uma conta?{" "}
        <button
          onClick={onBackToLogin}
          className="text-teal-300 hover:text-teal-200 underline font-medium transition-colors duration-150"
        >
          Faça login
        </button>
      </p>
    </animated.div>
  );
};

export default UserRegistration;
