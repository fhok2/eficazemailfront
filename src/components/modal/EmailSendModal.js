import React, { useState, useEffect } from 'react';
import { X, Send, Paperclip } from 'lucide-react';
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

  const modalSpring = useSpring({
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    opacity: isOpen ? 1 : 0,
    config: config.gentle
  });

  const overlaySpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: { duration: 200 }
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

  if (!isOpen) return null;

  return (
    <>
      <animated.div 
        style={overlaySpring} 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      <animated.div 
        style={modalSpring} 
        className="fixed bottom-0 left-0 right-0 bg-white  dark:bg-gray-800 rounded-t-lg shadow-lg z-50 overflow-hidden  "
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Criar Email</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="recipientEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">De:</Label>
            <Input
              id="senderEmail"
              type="email"
              value={userEmail}
              disabled
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="recipientEmail" className="text-sm font-medium text-gray-700 dark:text-gray-300">Para:</Label>
            <Input
              id="recipientEmail"
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            />
          </div>
          <div>
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">Assunto:</Label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Mensagem:</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end items-center">
            {/* <Button 
              type="button" 
              variant="outline" 
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <Paperclip className="h-5 w-5 mr-2" />
              Attach
            </Button> */}
            <Button 
              type="submit" 
              disabled={isLoading}
              className={`bg-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
        </form>
      </animated.div>
    </>
  );
};

export default EmailSendModal;