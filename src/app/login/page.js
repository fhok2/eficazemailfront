"use client";
import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/AuthContext";
import { ArrowRight, Mail, Lock, Loader, AlertCircle } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ResetPassword from "@/components/loginComponents/resetPassword";
import { loginWithGoogle } from "@/services/authService";
import { useRouter } from "next/navigation";
import GoogleButton from "@/components/button/GoogleButton";
import UserRegistration from "@/components/loginComponents/UserRegistration";
export const dynamic = "force-dynamic";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] =
    useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const router = useRouter();

  const { handleLogin, isAuthenticated, redirectToDashboardIfAuthenticated } =
    useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      redirectToDashboardIfAuthenticated();
    }
  }, [isAuthenticated, redirectToDashboardIfAuthenticated]);

  const handleGoogleSignInClick = async () => {
    setIsGoogleLoading(true);
    try {
      const response = await loginWithGoogle();
      if (response.error) {
        if (response.error.code === "auth/popup-closed-by-user") {
        } else {
          setError(response.error.message || "Erro ao fazer login com Google");
        }
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Ocorreu um erro inesperado. Por favor, tente novamente.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.gentle,
  });

  const buttonAnimation = useSpring({
    from: { scale: 1, boxShadow: "0 0 0 rgba(4, 157, 142, 0)" },
    to: { scale: 1.02, boxShadow: "0 4px 20px rgba(4, 157, 142, 0.3)" },
    config: { tension: 300, friction: 10 },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let finalValue =
      name === "email" ? value.trim().toLowerCase() : value.trim();
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const credentials = {
      email: formData.email,
      password: formData.password,
    };
    const response = await handleLogin(credentials);

    if (response.error) {
      setError(response.message);
    } else {
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  const getIcon = (field) => {
    switch (field) {
      case "email":
        return <Mail size={18} />;
      case "password":
        return <Lock size={18} />;
      default:
        return null;
    }
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

  if (isRegistering) {
    return (
      <UserRegistration
        onBackToLogin={() => setIsRegistering(false)}
        handleGoogleSignInClick={handleGoogleSignInClick}
        isGoogleLoading={isGoogleLoading}
      />
    );
  }

  return (
    <>
      <AnimatedBackground />
      <div className="flex flex-col justify-center items-center px-4 bg-transparent text-white relative z-10 h-full ">
        <animated.div
          className="w-full max-w-md flex flex-col my-10"
          style={fadeIn}
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              Acesse sua conta
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
          <animated.form
            onSubmit={handleSubmit}
            className="space-y-4 mt-8"
            style={fadeIn}
          >
            {renderFormField("email")}
            {renderFormField("password", "password")}
            <animated.div style={buttonAnimation}>
              <div className="px-1">
                <Button
                  type="submit"
                  disabled={loading || isGoogleLoading}
                  className="w-full py-6 px-4 m-auto bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex gap-3 items-center">
                      <Loader className="h-5 w-5 animate-spin text-white" />
                      Carregando...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Entrar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>
              </div>
            </animated.div>
          </animated.form>
          <div className="mt-4">
            <GoogleButton
              onClick={handleGoogleSignInClick}
              loading={isGoogleLoading}
              isRegistering={false}
            />
          </div>

          <animated.div className="mt-6 text-center " style={fadeIn}>
          <p className="text-xs font-medium text-gray-300 mt-2">
              Ao fazer login, você concorda com nossos
              <Link
                href="/terms-of-service"
                className="text-teal-300 hover:text-teal-400 focus:outline-none font-semibold ml-1"
              >
                Termos e Condições
              </Link>
            </p>
            <button
              onClick={() => setIsResetPasswordModalVisible(true)}
              className="text-sm font-semibold text-teal-300 hover:text-teal-400 focus:outline-none mt-3"
            >
              Esqueceu sua senha?
            </button>
            <p className="text-sm font-medium text-gray-300 mt-4">
              Não tem uma conta?
              <button
                onClick={() => setIsRegistering(true)}
                className="text-teal-300 hover:text-teal-400 focus:outline-none font-semibold ml-2"
              >
                Criar conta
              </button>
            </p>
           
          </animated.div>
        </animated.div>
      </div>
      <ResetPassword
        isVisible={isResetPasswordModalVisible}
        onClose={() => setIsResetPasswordModalVisible(false)}
        initialEmail={formData.email}
      />
    </>
  );
};

export default LoginPage;
