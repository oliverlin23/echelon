'use client';

import React, { useState, useEffect } from 'react';
import { Code, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface LandingNavbarProps {
  onGetStarted: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onGetStarted }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="ml-3 text-xl font-medium text-black">
              Echelon
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-black hover:text-gray-600 transition-colors duration-200 font-normal"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="text-black hover:text-gray-600 transition-colors duration-200 font-normal"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('cta')}
              className="text-black hover:text-gray-600 transition-colors duration-200 font-normal"
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onGetStarted}
              className="text-black hover:text-gray-600 transition-colors duration-200 font-normal px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="bg-black text-white hover:bg-gray-900 transition-colors duration-200 px-6 py-2 rounded-full font-normal"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-gray-600 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 bg-white/95 backdrop-blur-xl border-b border-gray-200/50">
            <button
              onClick={() => scrollToSection('features')}
              className="block w-full text-left px-4 py-2 text-black hover:text-gray-600 transition-colors duration-200 font-normal"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className="block w-full text-left px-4 py-2 text-black hover:text-gray-600 transition-colors duration-200 font-normal"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('cta')}
              className="block w-full text-left px-4 py-2 text-black hover:text-gray-600 transition-colors duration-200 font-normal"
            >
              Contact
            </button>
            <div className="px-4 pt-2 space-y-2">
              <button
                onClick={onGetStarted}
                className="w-full text-black hover:text-gray-600 transition-colors duration-200 font-normal px-4 py-2"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="w-full bg-black text-white hover:bg-gray-900 transition-colors duration-200 px-4 py-2 rounded-full font-normal"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
