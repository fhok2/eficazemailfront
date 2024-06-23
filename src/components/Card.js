import React from 'react';
const Card = ({ title, description, children }) => {
  return (
    <div className="bg-primary text-secondary p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-accent1 mb-4">{description}</p>
      {children}
    </div>
  );
};

export default Card;
