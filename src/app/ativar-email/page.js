'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const EmailVerificationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/api/emails/enviar-token-verificacao', {
        email: data.email,
        baseUrl: window.location.origin
      });
      
      setStatus({ type: 'success', message: response.data.message });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Ocorreu um erro ao enviar o token de verificação.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto  mt-8 p-6 bg-background-secondary rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-text-main">Verificação de Email</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email é obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Endereço de email inválido'
              }
            })}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="seu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-brand-dark text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out disabled:opacity-50"
        >
          {isLoading ? 'Enviando...' : 'Enviar Token de Verificação'}
        </button>
      </form>
      {status.message && (
        <Alert className={`mt-4 ${status.type === 'success' ? 'bg-brand-light-600' : 'bg-red-100'}`}>
          {status.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>{status.type === 'success' ? 'Sucesso' : 'Erro'}</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EmailVerificationForm;