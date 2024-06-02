// components/EmailForm.js
import React, { useState } from 'react';

const EmailForm = ({ addEmail }) => {
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmail(newEmail);
    setNewEmail('');
  };

  return (
    <div>
      <h2>Adicionar Novo E-mail</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
};

export default EmailForm;
