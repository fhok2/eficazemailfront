import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, type, message, email }) {
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    setCopied(false);
  }, [email]);


  const handleCopyEmail = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
      }).catch(err => {
        console.error('Falha ao copiar email: ', err);
      });
    } else {
      console.error('Clipboard API não está disponível');
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={`text-center ${type === "success" ? "text-green-500" : "text-red-500"}`}>
            {type === "success" ? "E-mail redirecionamento criado com sucesso" : "Ocorreu um erro"}
          </DialogTitle>
          <DialogClose>
            <X 
              onClick={onClose}
              className="h-4 w-4 bg-gray-300 rounded-sm -mr-3 absolute right-4 top-1 opacity-80 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer"
            />
          </DialogClose>
        </DialogHeader>
        <div className="grid gap-4 py-6 text-gray-900">
          <div className="flex items-center justify-center">
            {type === "success" ? (
              <CircleCheckIcon className="h-16 w-16 text-green-500" />
            ) : (
              <ErrorIcon className="h-16 w-16 text-red-500" />
            )}
          </div>
          <div className="text-center">
            <p className="text-md font-medium">{type === "success" ? "Seu endereço de e-mail é:" : ""}</p>
            <p className="text-xl font-bold">{type === "success" ? email : message}</p>
          </div>
        </div>
        <DialogFooter>
          {type === "success" && (
            <Button variant="outline" className="w-full outline-none" onClick={handleCopyEmail}>
              <CopyIcon className="mr-2 h-4 w-4" />
              {copied ? "Email copiado" : "Copiar Email"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ErrorIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
