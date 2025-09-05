'use client';

import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { LandingPage } from '../components/landing/LandingPage';
import { Navigation } from '../components/layout/Navigation';
import { CandidateDashboard } from '../components/dashboard/CandidateDashboard';
import { CompanyDashboard } from '../components/dashboard/CompanyDashboard';
import { User } from '../lib/api';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(true);
  const [showAuthForms, setShowAuthForms] = useState(false);
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading Echelon...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (!showAuthForms) {
      return <LandingPage onGetStarted={() => setShowAuthForms(true)} />;
    }

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="mb-4">
            <button
              onClick={() => setShowAuthForms(false)}
              className="text-gray-600 hover:text-gray-900 text-sm flex items-center"
            >
              ← Back to Home
            </button>
          </div>
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
      <div className="min-h-screen bg-gray-50">
        <Navigation user={user} onLogout={handleLogout} />
        
        <main>
          {user.type === 'candidate' ? <CandidateDashboard /> : <CompanyDashboard />}
        </main>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
