import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClasses = hover ? 'hover:bg-gray-50' : '';
  
  return (
    <div className={`bg-white border border-gray-200 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};
