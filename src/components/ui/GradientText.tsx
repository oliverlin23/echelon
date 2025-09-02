import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export const GradientText: React.FC<GradientTextProps> = ({ children, className = '' }) => {
  return (
    <span className={`bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};
