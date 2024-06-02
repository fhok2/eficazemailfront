import React from 'react';

const Input = ({ label, type = 'text', ...props }) => {
  return (
    <div className="mb-4">
      <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        className="mt-1 p-2 w-full border rounded-md bg-secondary bg-opacity-10 text-secondary focus:ring-accent focus:border-accent"
        {...props}
      />
    </div>
  );
};

export default Input;
