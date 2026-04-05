import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white px-4 py-2 rounded-lg transition-colors',
    danger: 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
