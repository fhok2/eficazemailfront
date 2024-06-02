import React from 'react';
import Input from './Input';
import Button from './Button';

const Form = ({ onSubmit, children, className }) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${className}`}>
      {children}
      <Button type="submit">Enviar</Button>
    </form>
  );
};

export default Form;
