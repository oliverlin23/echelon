import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = false }) => {
  const hoverClasses = hover ? 'hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 cursor-pointer' : '';
  
  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};
