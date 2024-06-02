import React from 'react';

const EmailAliasCard = ({ alias }) => {
  // Lógica para exibir as informações do alias (endereço, status, etc.)
  return (
    <div className="bg-primary bg-opacity-20 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-secondary mb-2">{alias.name}</h3>
      {/* Outros detalhes do alias */}
      <div className="mt-4 flex justify-between">
        {/* Botões para editar, desativar/reativar, etc. */}
      </div>
    </div>
  );
};

export default EmailAliasCard;
