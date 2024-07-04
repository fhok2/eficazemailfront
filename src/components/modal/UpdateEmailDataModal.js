import React, { useState, useEffect } from "react";
import { useMail } from "@/hooks/useMail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Mail } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';

const UpdateEmailDataModal = ({ redirectmail, email, onClose, purpose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [redirectMail, setRedirectMail] = useState(redirectmail);
  const [emailPurpose, setEmailPurpose] = useState(purpose);
  const { updateEmailForward } = useMail();

  useEffect(() => {
    setIsVisible(true);
    setRedirectMail(redirectmail);
    setEmailPurpose(purpose);
  }, [redirectmail, purpose]);

  const backdropSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    config: config.molasses,
  });

  const modalSpring = useSpring({
    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-50px)',
    opacity: isVisible ? 1 : 0,
    config: { ...config.wobbly, tension: 300, friction: 20 },
  });

  const formSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    delay: 200,
    config: config.gentle,
  });

  const iconSpring = useSpring({
    from: { transform: 'scale(0) rotate(-180deg)' },
    to: { transform: 'scale(1) rotate(0deg)' },
    delay: 300,
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
          return {
            ...emailItem,
            forwarding: redirectMail,
            purpose: emailPurpose,
            status: "active"
          };
        }
        return emailItem;
      });
      localStorage.setItem(
        "emailData",
        JSON.stringify({ ...storageData, emails: updatedEmails })
      );
    }
  };

  const handleUpdateMail = async () => {
    setIsLoading(true);
    try {
      await updateEmailForward({
        userEmail: email,
        clientEmail: email,
        forwardingEmail: redirectMail,
        purpose: emailPurpose,
      });
     
      updateLocalStorage();
      handleModalClose();
    } catch (error) {
      console.error("Error updating email forward:", error);
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
        <div className="p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 animate-pulse"></div>
          <animated.div
            style={iconSpring}
            className="flex items-center justify-center w-20 h-20 mb-6 bg-gray-700 rounded-full mx-auto relative z-10"
          >
            <Edit2 className="h-10 w-10 text-brand-light" />
          </animated.div>
          <h4 className="text-3xl text-white font-bold mb-4 text-center relative z-10">
            Atualizar dados de redirecionamento
          </h4>
          <p className="text-gray-300 mb-6 text-center relative z-10">
            Você está prestes a atualizar os dados de redirecionamento do e-mail{" "}
            <span className="font-semibold text-brand-light">{email}</span>.
            Esta ação não é permanente e pode ser revertida a qualquer momento.
          </p>
          <animated.form style={formSpring} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="redirectMail" className="text-sm font-medium text-gray-300 flex items-center">
                Encaminha para: <Mail className="h-4 w-4 ml-1 text-brand-light" />
              </Label>
              <Input
                id="redirectMail"
                type="email"
                value={redirectMail}
                onChange={(e) => setRedirectMail(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailPurpose" className="text-sm font-medium text-gray-300 flex items-center">
                Finalidade <Edit2 className="h-4 w-4 ml-1 text-brand-light" />
              </Label>
              <Input
                id="emailPurpose"
                type="text"
                value={emailPurpose}
                onChange={(e) => setEmailPurpose(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
              />
            </div>
          </animated.form>
        </div>
        <div className="px-6 py-4 bg-gray-700 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 relative z-10">
          <Button
            onClick={handleModalClose}
            variant="secondary"
            className="w-full sm:w-auto hover:bg-gray-600 transition-colors duration-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateMail}
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
                Atualizando...
              </span>
            ) : (
              "Atualizar"
            )}
          </Button>
        </div>
      </animated.div>
    </animated.div>
  );
};

export default UpdateEmailDataModal;