'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Code, Rocket, Star, Users, Zap, ArrowRight, Sparkles, Target } from 'lucide-react';
import { Button } from '../ui/Button';
import { LandingNavbar } from './LandingNavbar';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    stats: false,
    cta: false,
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Typewriter effect
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Elevate Your Talent to the Next Level';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLDivElement;
            if (target === heroRef.current) setIsVisible(prev => ({ ...prev, hero: true }));
            if (target === featuresRef.current) setIsVisible(prev => ({ ...prev, features: true }));
            if (target === statsRef.current) setIsVisible(prev => ({ ...prev, stats: true }));
            if (target === ctaRef.current) setIsVisible(prev => ({ ...prev, cta: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, featuresRef, statsRef, ctaRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Floating animation for background elements
  const FloatingElement = ({ delay = 0, size = 'w-4 h-4', top = '20%', left = '10%' }) => (
    <div
      className={`absolute ${size} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce`}
      style={{
        top,
        left,
        animationDelay: `${delay}s`,
        animationDuration: '3s',
      }}
    />
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Navbar */}
      <LandingNavbar onGetStarted={onGetStarted} />
      
      {/* Animated Background Elements */}
      <FloatingElement delay={0} size="w-6 h-6" top="10%" left="15%" />
      <FloatingElement delay={1} size="w-4 h-4" top="30%" left="85%" />
      <FloatingElement delay={2} size="w-8 h-8" top="60%" left="10%" />
      <FloatingElement delay={1.5} size="w-3 h-3" top="80%" left="80%" />
      <FloatingElement delay={0.5} size="w-5 h-5" top="20%" left="70%" />

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className={`text-center max-w-4xl transform transition-all duration-1000 ${
          isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          {/* Animated Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <Code className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2">
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            </div>
          </div>

          {/* Typewriter Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>

          {/* Subtitle with fade-in animation */}
          <p className={`text-xl md:text-2xl text-gray-600 mb-8 transform transition-all duration-1000 delay-500 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Connect with top companies and showcase your skills on the platform that 
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold"> transforms careers</span>
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 delay-700 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Button 
              onClick={onGetStarted}
              className="px-8 py-4 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-full transition-all duration-300 hover:shadow-xl"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-indigo-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-indigo-600 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Echelon?
            </h2>
            <p className="text-xl text-gray-600">Experience the future of talent acquisition</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Rocket className="w-8 h-8" />,
                title: "Launch Your Career",
                description: "Get discovered by top companies actively seeking your skills",
                delay: 0
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast Matching",
                description: "Our AI connects you with perfect opportunities in seconds",
                delay: 200
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Precision Targeting",
                description: "Find exactly what you're looking for with advanced filters",
                delay: 400
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-700 hover:scale-105 ${
                  isVisible.features 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 text-white transform hover:rotate-6 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-white">
              Trusted by Thousands
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { number: "50K+", label: "Active Users", icon: <Users className="w-8 h-8" /> },
                { number: "1K+", label: "Companies", icon: <Star className="w-8 h-8" /> },
                { number: "95%", label: "Success Rate", icon: <Rocket className="w-8 h-8" /> }
              ].map((stat, index) => (
                <div key={index} className="text-white">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" ref={ctaRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who've already elevated their careers with Echelon
            </p>
            <Button 
              onClick={onGetStarted}
              className="px-12 py-6 text-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center mx-auto group"
            >
              Start Your Journey
              <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
