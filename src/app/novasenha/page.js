'use client';

import { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/sendPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Exibe mensagem de sucesso da API
      } else {
        setError(data.message); // Exibe mensagem de erro da API
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      setError('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-secondary mb-8">Esqueci minha senha</h1>

      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
