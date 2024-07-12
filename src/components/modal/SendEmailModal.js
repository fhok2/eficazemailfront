import React, { useState, useEffect } from 'react';
import { X, Send, Mail, Paperclip } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/services/emailService';


const EmailSendModal = ({ isOpen, onClose, userEmail }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setIsLoading(true);
    try {
      await sendEmail({
        userEmail,
        clientEmail: recipientEmail,
        subject,
        message
      });
      onClose();
      // Show success message
    } catch (error) {
      console.error('Failed to send email:', error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = (e) => {
    e.preventDefault();
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
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
              <Mail className="h-8 w-8 text-brand-light" />
            </animated.div>
            <h4 className="text-2xl text-white font-bold mb-3 text-center relative z-10">
              Criar Email
            </h4>
            <p className="text-gray-300 mb-4 text-center text-sm relative z-10">
            Componha e envie seu e-mail. Todos os campos são obrigatórios para garantir a entrega adequada.
            </p>
            <animated.form onSubmit={handleSubmit} style={formSpring} className="space-y-4 relative z-10">
              <div className="space-y-1">
                <Label htmlFor="senderEmail" className="text-sm font-medium text-gray-300">
                  De:
                </Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={userEmail}
                  disabled
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="recipientEmail" className="text-sm font-medium text-gray-300 flex items-center">
                  Para: <Mail className="h-4 w-4 ml-1 text-brand-light" />
                </Label>
                <Input
                  id="recipientEmail"
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="subject" className="text-sm font-medium text-gray-300 flex items-center">
                  Assunto: <Paperclip className="h-4 w-4 ml-1 text-brand-light" />
                </Label>
                <Input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Mensagem:
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  className="bg-gray-700 text-white border-gray-600 focus:border-brand-light resize-none"
                />
              </div>
            </animated.form>
          </div>
          <div className="px-6 py-4 bg-gray-700 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 relative z-10">
            <Button
              onClick={handleModalClose}
              variant="secondary"
              className="w-full sm:w-auto hover:bg-gray-600 transition-colors duration-300"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
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
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Enviar
                </>
              )}
            </Button>
          </div>
        </animated.div>
      </animated.div>
     
    </>
  );
};

export default EmailSendModal;