import React from 'react';
import { Code } from 'lucide-react';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';

interface NavigationProps {
  user: {
    email: string;
  };
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  return (
    <nav className="relative bg-white/80 backdrop-blur-md border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">
            <GradientText>Echelon</GradientText>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Welcome back, <strong>{user.email}</strong></span>
          <Button onClick={onLogout} variant="ghost">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
