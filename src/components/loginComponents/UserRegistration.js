import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight, User, Mail, Phone, Lock, Loader } from "lucide-react";
import DDDs from "@/enums/ddds";
import GoogleButton from "@/components/button/GoogleButton";
import AnimatedBackground from "../AnimatedBackground";
import Link from "next/link";

const UserRegistration = ({
  onBackToLogin,
  handleGoogleSignInClick,
  isGoogleLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { handleRegister } = useAuthContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeIn = useSpring({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    config: config.gentle,
  });

  const buttonAnimation = useSpring({
    from: { scale: 1, boxShadow: "0 0 0 rgba(4, 157, 142, 0)" },
    to: { scale: 1.02, boxShadow: "0 4px 20px rgba(4, 157, 142, 0.3)" },
    config: { tension: 300, friction: 10 },
  });

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    switch (name) {
      case "email":
        finalValue = value.trim().toLowerCase();
        break;
      case "name":
        finalValue = value.trim();
        validateName(finalValue);
        break;
      case "phone":
        finalValue = value.replace(/\D/g, "").slice(0, 11);
        validatePhone(finalValue);
        break;
      default:
        finalValue = value.trim();
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    setError("");
  };

  const validateName = (name) => {
    const isValid = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(\s+[a-zA-ZÀ-ÖØ-öø-ÿ]+)+$/.test(name);
    setNameError(isValid ? "" : "Por favor, digite nome e sobrenome válidos");
  };

  const validatePhone = (phone) => {
    if (phone.length !== 11) {
      setPhoneError(
        "Ops! Parece que seu número está incompleto. Lembre-se: são 11 dígitos, incluindo o DDD."
      );
    } else {
      const ddd = phone.slice(0, 2);
      setPhoneError(
        DDDs.includes(ddd)
          ? ""
          : "Hmm, esse DDD não parece familiar. Que tal conferir se digitou corretamente?"
      );
    }
  };

  const handlePhoneBlur = () => {
    validatePhone(formData.phone);
    setShowPhoneError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nameError || phoneError) {
      setError(
        "Ops! Parece que temos alguns detalhes para ajustar. Vamos dar uma olhada nos campos destacados?"
      );
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
    const icons = {
      name: <User size={18} />,
      email: <Mail size={18} />,
      phone: <Phone size={18} />,
      password: <Lock size={18} />,
    };
    return icons[field] || null;
  };

  const renderFormField = (field, type = "text") => (
    <div key={field} className="form-group relative mb-6">
      <Label
        className={`absolute left-10 text-sm font-semibold transition-all duration-300 ${
          focusedField === field || formData[field]
            ? "top-1 text-xs text-teal-300"
            : "top-1/2 -translate-y-1/2 text-gray-400"
        }`}
        htmlFor={field}
      >
        {field === "name"
          ? "Nome e Sobrenome"
          : field === "phone"
          ? "Telefone"
          : field.charAt(0).toUpperCase() + field.slice(1)}
      </Label>
      <div className="relative">
        <Input
          type={type}
          id={field}
          name={field}
          value={formData[field]}
          onChange={handleInputChange}
          onFocus={() => setFocusedField(field)}
          onBlur={
            field === "phone" ? handlePhoneBlur : () => setFocusedField(null)
          }
          required
          className="mt-1 bg-gray-800 bg-opacity-50 text-white border-gray-700 rounded-lg py-8 pl-12 w-full focus:ring-2 focus:ring-brand-light transition-all duration-300 placeholder-transparent"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {getIcon(field)}
        </span>
      </div>
      {field === "name" && nameError && (
        <p className="text-red-500 text-xs mt-1">{nameError}</p>
      )}
      {field === "phone" && showPhoneError && phoneError && (
        <animated.div
          style={fadeIn}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mt-2"
        >
          <p>{phoneError}</p>
        </animated.div>
      )}
    </div>
  );

  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col justify-center items-center px-4 bg-transparent text-white relative z-10 h-full mb-20">
        <animated.div
          className="w-full max-w-md flex flex-col my-10 z-40 m-auto "
          style={fadeIn}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              Criar nova conta
            </span>
          </h1>
          <p className="text-xl text-gray-300 text-center mb-8">
            Proteja sua privacidade online com EficazMail
          </p>
          {error && (
            <animated.div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6"
              role="alert"
              style={fadeIn}
            >
              <p>{error}</p>
            </animated.div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            {renderFormField("name")}
            {renderFormField("email")}
            {renderFormField("phone")}
            {renderFormField("password", "password")}
            <animated.div style={buttonAnimation}>
              <div className="px-1">
                <Button
                  type="submit"
                  disabled={loading || nameError || phoneError}
                  className="w-full py-6 px- m-auto bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex gap-3 items-center">
                      <Loader className="h-5 w-5 animate-spin text-white" />
                      Carregando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Criar conta
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </div>
            </animated.div>
          </form>
          <div className="mt-4">
            <GoogleButton
              onClick={handleGoogleSignInClick}
              loading={isGoogleLoading}
              isRegistering={true}
            />
          </div>
          <p className="text-xs font-medium text-gray-300 mt-6">
            Ao efetuar seu cadastro, você concorda com nossos
            <Link
              href="/terms-of-service"
              className="text-teal-300 hover:text-teal-400 focus:outline-none font-semibold ml-1"
            >
              Termos e Condições
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Já tem uma conta?{" "}
            <button
              onClick={onBackToLogin}
              className="text-teal-300 hover:text-teal-200 underline font-medium transition-colors duration-150"
            >
              Faça login
            </button>
          </p>
        
        </animated.div>
      </div>
    </>
  );
};

export default UserRegistration;
