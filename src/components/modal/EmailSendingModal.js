import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const EmailSendingModal = ({ isOpen }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + 1, 100);
        });
      }, 50);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-80 h-80 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="mb-4 text-xl font-bold text-gray-800">Enviando e-mail</div>
        <div className="w-48 h-32 bg-blue-100 rounded-lg relative overflow-hidden">
          <div 
            className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500 ease-out"
            style={{ height: `${progress}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-24 border-2 border-blue-500 rounded transform rotate-6 flex items-center justify-center">
              <div className="w-32 h-16 bg-white rounded flex items-center justify-center">
                <Send className="text-blue-500" size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-gray-600">{progress}% concluído</div>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-purple-500" 
             style={{ transform: `translateX(${progress - 100}%)` }} />
      </div>
    </div>
  );
};

export default EmailSendingModal;