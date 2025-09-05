'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { GradientText } from '../ui/GradientText';
import { api } from '../../lib/api';

interface RegisterFormProps {
  onRegister: (user: any) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'candidate' | 'company'>('candidate');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await api.register({ email, type: userType });
      onRegister(user);
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Card className="p-6 max-w-sm mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">
          <GradientText>Join Echelon</GradientText>
        </h2>
        <p className="text-gray-500 text-sm">Create your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant={userType === 'candidate' ? 'primary' : 'outline'}
              onClick={() => setUserType('candidate')}
              size="sm"
            >
              Candidate
            </Button>
            <Button
              type="button"
              variant={userType === 'company' ? 'primary' : 'outline'}
              onClick={() => setUserType('company')}
              size="sm"
            >
              Company
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" size="md">
          Create Account
        </Button>
      </form>
      
      <p className="text-center mt-4 text-gray-500 text-sm">
        Already have an account?{' '}
        <button
          onClick={onSwitchToLogin}
          className="text-gray-900 hover:text-gray-700 underline"
        >
          Sign in
        </button>
      </p>
    </Card>
  );
};
