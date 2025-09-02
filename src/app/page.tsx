'use client';

import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Navigation } from '../components/layout/Navigation';
import { CandidateDashboard } from '../components/dashboard/CandidateDashboard';
import { CompanyDashboard } from '../components/dashboard/CompanyDashboard';
import { User } from '../lib/api';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (userData: User) => {
    setUser(userData);
  };

  const handleRegister = async (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Echelon...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {showLogin ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setShowLogin(false)}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setShowLogin(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout }}>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50">
        <Navigation user={user} onLogout={handleLogout} />
        
        <main className="relative">
          {user.type === 'candidate' ? <CandidateDashboard /> : <CompanyDashboard />}
        </main>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
