import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, CheckCircle } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const FeedbackModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      loadEmailFromLocalStorage();
    }
  }, [isOpen]);

  const loadEmailFromLocalStorage = () => {
    try {
      const dashboardData = JSON.parse(localStorage.getItem("dashboardData"));
      if (dashboardData && dashboardData.email) {
        setEmail(dashboardData.email);
      }
    } catch (error) {
      console.error("Error loading email from localStorage:", error);
    }
  };

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
    setTimeout(() => {
      onClose();
      resetForm();
    }, 300);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setFeedback("");
    setSubmitStatus(null);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/send_feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        handleModalClose();
      }, 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus('error');
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
        className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 relative overflow-y-auto flex-grow">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/10 to-brand-light/10 animate-pulse"></div>
          <animated.div
            style={iconSpring}
            className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-700 rounded-full mx-auto relative z-10"
          >
            <MessageSquare className="h-8 w-8 text-brand-light" />
          </animated.div>
          <h4 className="text-2xl text-white font-bold mb-3 text-center relative z-10">
            Enviar Feedback
          </h4>
          <p className="text-gray-300 mb-4 text-center text-sm relative z-10">
            Sua opinião é importante para nós. Por favor, compartilhe seus pensamentos para nos ajudar a melhorar.
          </p>
          {submitStatus === 'success' ? (
            <Alert variant="success" className="mb-4 bg-green-500 text-white">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Sucesso!</AlertTitle>
              <AlertDescription>
                Seu feedback foi enviado com sucesso. Obrigado por nos ajudar a melhorar!
              </AlertDescription>
            </Alert>
          ) : submitStatus === 'error' ? (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Ocorreu um erro ao enviar seu feedback. Por favor, tente novamente.
              </AlertDescription>
            </Alert>
          ) : (
            <animated.form onSubmit={handleSubmitFeedback} style={formSpring} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="feedback" className="text-sm font-medium text-gray-300">
                  Seu Feedback
                </Label>
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light h-32"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  type="button"
                  onClick={handleModalClose}
                  variant="secondary"
                  className="w-full sm:w-auto hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
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
                      Enviando...
                    </span>
                  ) : (
                    "Enviar Feedback"
                  )}
                </Button>
              </div>
            </animated.form>
          )}
        </div>
      </animated.div>
    </animated.div>
  );
};

export default FeedbackModal;