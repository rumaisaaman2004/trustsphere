import React from 'react';

const Card = ({ children, title, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;
