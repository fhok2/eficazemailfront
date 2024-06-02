import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [userEmails, setUserEmails] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUserEmails = async () => {
      try {
        const response = await axios.get('/api/emails/listaremailusuario');
        setUserEmails(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar e-mails do usuário:', error);
      }
    };
    fetchUserEmails();
  }, []);

  const handleCreateEmail = async () => {
    try {
      const response = await axios.post('/api/emails/criaremail', { userEmail: 'seuEmail@gmail.com', customName: newEmail });
      setUserEmails([...userEmails, response.data.data]);
      setNewEmail('');
      setOpenDialog(false);
    } catch (error) {
      console.error('Erro ao criar novo e-mail:', error);
    }
  };

  const handleDeactivateEmail = async (email) => {
    try {
      await axios.post('/api/emails/cancelarencaminhamento', { userEmail: 'seuEmail@gmail.com', clientEmail: email });
      setUserEmails(userEmails.map(e => (e.address === email ? { ...e, status: 'inactive' } : e)));
    } catch (error) {
      console.error('Erro ao desativar e-mail:', error);
    }
  };

  const handleUpdateEmail = async (email, newForwarding) => {
    try {
      await axios.post('/api/emails/atualizarencaminhamento', { userEmail: 'seuEmail@gmail.com', clientEmail: email, forwardingEmail: newForwarding });
      setUserEmails(userEmails.map(e => (e.address === email ? { ...e, forwarding: newForwarding } : e)));
    } catch (error) {
      console.error('Erro ao atualizar e-mail:', error);
    }
  };

  const handleReactivateEmail = async (email) => {
    try {
      await axios.post('/api/emails/reativarencaminhamento', { userEmail: 'seuEmail@gmail.com', clientEmail: email });
      setUserEmails(userEmails.map(e => (e.address === email ? { ...e, status: 'active' } : e)));
    } catch (error) {
      console.error('Erro ao reativar e-mail:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Visão Geral do Usuário</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Seus E-mails</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOpenDialog(true)}
          >
            Criar Novo E-mail
          </button>
        </div>
        {openDialog && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Criar Novo E-mail</h3>
              <input
                type="text"
                placeholder="Nome do E-mail"
                className="border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreateEmail}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {userEmails.map((email) => (
            <div key={email.address} className="bg-gray-100 rounded-lg p-4">
              <h3 className="text-lg font-bold">{email.address}</h3>
              <p className="text-gray-600 mb-2">Encaminhamento: {email.forwarding}</p>
              <p className="text-gray-600 mb-4">Status: {email.status}</p>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-4 py-2 rounded-md ${
                    email.status === 'inactive'
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  onClick={() => handleDeactivateEmail(email.address)}
                  disabled={email.status === 'inactive'}
                >
                  Desativar
                </button>
                <input
                  type="text"
                  defaultValue={email.forwarding}
                  className="border-gray-300 rounded-md px-4 py-2 w-full"
                  onBlur={(e) => handleUpdateEmail(email.address, e.target.value)}
                />
                <button
                  className={`px-4 py-2 rounded-md ${
                    email.status === 'active'
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                  onClick={() => handleReactivateEmail(email.address)}
                  disabled={email.status === 'active'}
                >
                  Reativar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
