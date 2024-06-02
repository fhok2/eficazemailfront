import React, { useState } from 'react';
import Plans from '../components/Plans';

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center text-secondary mb-8">Pagamento</h1>

      {currentStep === 1 && (
        <>
          {/* Etapa 1: Informações */}
          <Plans />
          <button className="bg-accent text-secondary font-bold py-2 px-4 rounded mt-4" onClick={handleNextStep}>
            Continuar
          </button>
        </>
      )}

      {currentStep === 2 && (
        <>
          {/* Etapa 2: Dados de Pagamento */}
          {/* ... formulário de pagamento ... */}
          <button className="bg-accent text-secondary font-bold py-2 px-4 rounded mt-4" onClick={handleNextStep}>
            Finalizar Pagamento
          </button>
          <button className="bg-gray-500 text-secondary font-bold py-2 px-4 rounded mt-4 ml-4" onClick={handlePreviousStep}>
            Voltar
          </button>
        </>
      )}

      {currentStep === 3 && (
        <>
          {/* Etapa 3: Confirmação */}
          <p className="text-center text-green-500">Pagamento realizado com sucesso!</p>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
