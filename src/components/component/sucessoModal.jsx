import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Check, AlertCircle, Copy, Info } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';

export default function Modal({ open, onClose, type, message, email }) {
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setIsVisible(open);
  }, [open]);

  useEffect(() => {
    setCopied(false);
  }, [email]);

  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }).catch(err => {
        console.error('Falha ao copiar email: ', err);
      });
    } else {
      console.error('Clipboard API não está disponível');
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

  const iconSpring = useSpring({
    from: { transform: 'scale(0) rotate(-180deg)' },
    to: { transform: 'scale(1) rotate(0deg)' },
    delay: 300,
    config: { ...config.wobbly, tension: 300, friction: 10 },
  });

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-2xl p-0">
        <animated.div style={modalSpring} className="relative">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className={`text-center text-2xl font-bold ${type === "success" ? "text-green-500" : "text-red-500"}`}>
              {type === "success" ? "E-mail redirecionamento criado com sucesso" : "Ocorreu um erro"}
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4">
              <X 
                onClick={onClose}
                className="h-4 w-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              />
            </DialogClose>
          </DialogHeader>
          <div className="grid gap-4 p-6 text-gray-300">
            <animated.div style={iconSpring} className="flex items-center justify-center">
              {type === "success" ? (
                <Check className="h-16 w-16 text-green-500" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500" />
              )}
            </animated.div>
            <div className="text-center">
              <p className="text-sm font-medium">{type === "success" ? "Seu endereço de e-mail é:" : ""}</p>
              <p className="text-lg font-bold mt-2 break-all">{type === "success" ? email : message}</p>
            </div>
          </div>
          <DialogFooter className="p-6 pt-0">
            {type === "success" && (
              <div className="w-full space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-300"
                  onClick={handleCopyEmail}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Email copiado" : "Copiar Email"}
                </Button>
                <div className="flex items-start text-xs text-gray-400">
                  <Info className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Verifique sempre a caixa de spam, promoção, social ou lixeira quando usar o e-mail acima informado.</span>
                </div>
              </div>
            )}
          </DialogFooter>
        </animated.div>
      </DialogContent>
    </Dialog>
  );
}