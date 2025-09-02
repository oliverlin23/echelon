'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { GradientText } from '../ui/GradientText';
import { api } from '../../lib/api';

interface LoginFormProps {
  onLogin: (user: any) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await api.login(email, password);
      onLogin(user);
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <Card className="p-8 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          <GradientText>Welcome Back</GradientText>
        </h2>
        <p className="text-gray-700">Sign in to your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" size="lg">
          Sign In
        </Button>
      </form>
      
      <p className="text-center mt-6 text-gray-700">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-violet-600 hover:text-violet-700 font-semibold underline"
        >
          Sign up
        </button>
      </p>
    </Card>
  );
};
