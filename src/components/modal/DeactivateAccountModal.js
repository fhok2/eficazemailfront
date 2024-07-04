import React, { useState, useEffect } from "react";
import { useMail } from "@/hooks/useMail";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from 'lucide-react';
import { useSpring, animated, config } from "react-spring";

const DeactivateAccountModal = ({ redirectmail, email, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { cancelEmailForward } = useMail();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const modalAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-50px)',
    config: { ...config.wobbly, tension: 300, friction: 20 },
  });

  const contentAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    delay: 100,
    config: config.gentle,
  });

  const iconAnimation = useSpring({
    transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
    delay: 200,
    config: { ...config.wobbly, tension: 300, friction: 10 },
  });

  const handleModalClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const updateLocalStorage = () => {
    const storageData = JSON.parse(localStorage.getItem("emailData"));
    if (storageData) {
      const updatedEmails = storageData.emails.map((emailItem) => {
        if (emailItem.address === email) {
          return { ...emailItem, status: "inactive" };
        }
        return emailItem;
      });
      localStorage.setItem(
        "emailData",
        JSON.stringify({ ...storageData, emails: updatedEmails })
      );
    }
  };

  const handleDeactivate = async () => {
    setIsLoading(true);
    try {
      await cancelEmailForward({ email, forwardTo: redirectmail });
      updateLocalStorage();
      handleModalClose();
    } catch (error) {
      console.error("Error cancelling email forward:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-80">
      <animated.div
        style={modalAnimation}
        className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-xl"
      >
        <animated.div style={contentAnimation} className="p-6">
          <animated.div 
            style={iconAnimation} 
            className="flex items-center justify-center w-16 h-16 mb-6 bg-gray-700 rounded-full mx-auto"
          >
            <AlertTriangle className="h-8 w-8 text-teal-500" />
          </animated.div>
          <h4 className="text-2xl text-white font-bold mb-4 text-center">
            Desativar Redirecionamento
          </h4>
          <p className="text-gray-300 mb-6 text-center">
            Você está prestes a desativar o redirecionamento do e-mail{" "}
            <span className="font-semibold text-white">{email}</span> para{" "}
            <span className="font-semibold text-white">{redirectmail}</span>.
            Esta ação não é permanente e pode ser revertida a qualquer momento.
          </p>
        </animated.div>
        <animated.div 
          style={contentAnimation} 
          className="px-6 py-4 bg-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3"
        >
          <Button
            onClick={handleModalClose}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeactivate}
            disabled={isLoading}
            className={`w-full sm:w-auto ${
              isLoading
                ? "bg-teal-600 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-400 to-brand-light hover:shadow-lg hover:scale-105"
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
                Desativando...
              </span>
            ) : (
              "Desativar"
            )}
          </Button>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default DeactivateAccountModal;