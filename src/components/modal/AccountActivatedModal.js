import React, { useState, useEffect } from "react";
import { useMail } from "@/hooks/useMail";
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';
import { useSpring, animated, config } from "react-spring";

const AccountActivatedModal = ({ redirectmail, email, onClose,onCloseClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { activateEmailForward } = useMail();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const backdropSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    config: config.molasses,
  });

  const modalSpring = useSpring({
    transform: isVisible ? "scale(1) translateY(0)" : "scale(0.9) translateY(-50px)",
    opacity: isVisible ? 1 : 0,
    config: { ...config.wobbly, tension: 300, friction: 20 },
  });

  const iconSpring = useSpring({
    from: { transform: "scale(0) rotate(-180deg)" },
    to: { transform: "scale(1) rotate(0deg)" },
    delay: 300,
    config: { ...config.wobbly, tension: 300, friction: 10 },
  });

  const handleModalClose = (e) => {
    e.preventDefault(); 
    setIsVisible(false);
    setTimeout(() => {
      onCloseClick(); 
    }, 300);
  };

  const updateLocalStorage = () => {
    const storageData = JSON.parse(localStorage.getItem("emailData")) || { emails: [] };
    if (storageData.emails) {
      const updatedEmails = storageData.emails.map((emailItem) => {
        if (emailItem.address === email) {
          return { ...emailItem, status: "active" };
        }
        return emailItem;
      });
      localStorage.setItem(
        "emailData",
        JSON.stringify({ ...storageData, emails: updatedEmails })
      );
    }
  };

  const handleActivated = async () => {
    setIsLoading(true);
    try {
      await activateEmailForward({ email, forwardTo: redirectmail });
      updateLocalStorage();
      onClose();
    } catch (error) {
      console.error("Error activating email forward:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <animated.div
      style={backdropSpring}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80"
      onClick={handleModalClose}
    >
      <animated.div
        style={modalSpring}
        className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 animate-pulse"></div>
          <animated.div
            style={iconSpring}
            className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gray-700 rounded-full relative z-10"
          >
            <Info className="h-10 w-10 text-brand-light" />
          </animated.div>
          <h4 className="text-3xl text-white font-bold mb-4 relative z-10">
            Reativar Redirecionamento
          </h4>
          <p className="text-gray-300 mb-6 relative z-10">
            Você está prestes a reativar o redirecionamento do e-mail{" "}
            <span className="font-semibold text-brand-light">{email}</span> para{" "}
            <span className="font-semibold text-brand-light">{redirectmail}</span>.
            Esta ação não é permanente e pode ser revertida a qualquer momento.
          </p>
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 relative z-10">
            <Button
              onClick={handleModalClose}
              variant="secondary"
              className="w-full sm:w-auto hover:bg-gray-600 transition-colors duration-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleActivated}
              disabled={isLoading}
              className={`w-full sm:w-auto ${
                isLoading
                  ? "bg-brand-dark-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-brand-dark to-brand-light hover:shadow-lg hover:scale-105"
              } text-white font-semibold transition-all duration-300`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Reativando...
                </span>
              ) : (
                "Reativar"
              )}
            </Button>
          </div>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default AccountActivatedModal;
