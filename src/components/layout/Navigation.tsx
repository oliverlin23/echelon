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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-900 flex items-center justify-center mr-2">
            <Code className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold">
            <GradientText>Echelon</GradientText>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-600 text-sm">{user.email}</span>
          <Button onClick={onLogout} variant="ghost" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};
