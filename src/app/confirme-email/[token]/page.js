'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EmailValidationStatus = () => {
  const params = useParams();
  const router = useRouter();
  const [status, setStatus] = useState({ type: 'loading', message: 'Verificando seu email...' });

  useEffect(() => {
    const token = params.token;
    if (token) {
      validateEmail(token);
    }
  }, [params.token]);

  const validateEmail = async (token) => {
    try {
      const response = await fetch(`http://localhost:3005/api/emails/validar-email/${token}`, {
        method: 'GET',
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: data.message });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Ocorreu um erro ao validar o email.' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-background-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-text-main text-center">Validação de Email</h2>
      <Alert className={`mt-4 ${
        status.type === 'success' ? 'bg-brand-light-600' : 
        status.type === 'error' ? 'bg-red-100' : 
        'bg-blue-100'
      }`}>
        {status.type === 'success' ? (
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        ) : status.type === 'error' ? (
          <XCircle className="h-6 w-6 text-red-600" />
        ) : (
          <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
        )}
        <AlertTitle className="text-lg font-semibold">
          {status.type === 'success' ? 'Sucesso' : 
           status.type === 'error' ? 'Erro' : 
           'Processando'}
        </AlertTitle>
        <AlertDescription className="mt-2">{status.message}</AlertDescription>
      </Alert>
      {status.type !== 'loading' && (
        <button
          onClick={() => router.push('/')}
          className="mt-6 w-full bg-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
        >
          Voltar para a página inicial
        </button>
      )}
    </div>
  );
};

export default EmailValidationStatus;