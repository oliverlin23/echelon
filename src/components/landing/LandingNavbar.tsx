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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                  : 'bg-white/20 backdrop-blur-sm border border-white/30'
              }`}>
                <Code className={`w-5 h-5 transition-colors duration-300 ${
                  isScrolled ? 'text-white' : 'text-indigo-600'
                }`} />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <span className={`ml-3 text-xl font-bold transition-colors duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent' 
                : 'text-indigo-700'
            }`}>
              Echelon
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className={`font-medium transition-colors duration-300 hover:scale-105 transform ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600' 
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className={`font-medium transition-colors duration-300 hover:scale-105 transform ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600' 
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('cta')}
              className={`font-medium transition-colors duration-300 hover:scale-105 transform ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600' 
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onGetStarted}
              className={`transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                  : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
              }`}
            >
              Sign In
            </Button>
            <Button
              onClick={onGetStarted}
              className={`transition-all duration-300 transform hover:scale-105 ${
                isScrolled
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
              }`}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600' 
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className={`py-4 space-y-4 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-md rounded-b-2xl border-b border-white/20' 
              : 'bg-white/10 backdrop-blur-md rounded-b-2xl border border-white/20'
          }`}>
            <button
              onClick={() => scrollToSection('features')}
              className={`block w-full text-left px-4 py-2 font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                  : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
              } rounded-lg`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('stats')}
              className={`block w-full text-left px-4 py-2 font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                  : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
              } rounded-lg`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('cta')}
              className={`block w-full text-left px-4 py-2 font-medium transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                  : 'text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50'
              } rounded-lg`}
            >
              Contact
            </button>
            <div className="px-4 pt-2 space-y-2">
              <Button
                variant="ghost"
                onClick={onGetStarted}
                className={`w-full transition-all duration-300 ${
                  isScrolled 
                    ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </Button>
              <Button
                onClick={onGetStarted}
                className={`w-full transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                }`}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
