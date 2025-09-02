'use client';

import React, { createContext, useContext } from 'react';

interface User {
  id: number;
  email: string;
  type: 'company' | 'candidate';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
