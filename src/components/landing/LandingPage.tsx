'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    navbar: false,
    scrollIndicator: false,
  });
  const [scrollY, setScrollY] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Simple title text
  const titleText = 'Elevate Your Career to the Next Level';

  // Initial page load animations
  useEffect(() => {
    // Trigger navbar animation on page load
    const timer = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, navbar: true }));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    const updateScrollY = () => {
      handleScroll();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollY);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            if (target === scrollIndicatorRef.current) setIsVisible(prev => ({ ...prev, scrollIndicator: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    [heroRef, featuresRef, statsRef, ctaRef, scrollIndicatorRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // Glass scrolling elements component
  const GlassScrollElement = ({ 
    initialX = 50, 
    initialY = 50, 
    parallaxSpeed = 0.5, 
    size = 200,
    blur = 40,
    opacity = 0.1,
    variant = 'circle',
    delay = 0
  }: {
    initialX?: number;
    initialY?: number;
    parallaxSpeed?: number;
    size?: number;
    blur?: number;
    opacity?: number;
    variant?: 'circle' | 'oval' | 'rounded';
    delay?: number;
  }) => {
    const [isElementVisible, setIsElementVisible] = useState(false);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsElementVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }, [delay]);

    const translateY = scrollY * parallaxSpeed;
    const translateX = Math.sin(scrollY * 0.001 + initialX) * 15;
    const rotation = scrollY * 0.02;
    
    const variants = {
      circle: 'rounded-full',
      oval: 'rounded-full',
      rounded: 'rounded-3xl'
    };

    const aspectRatio = variant === 'oval' ? 0.6 : 1;
    
    return (
      <div
        className={`fixed pointer-events-none will-change-transform transition-all duration-1000 ease-out ${
          isElementVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          left: `${initialX}%`,
          top: `${initialY}%`,
          transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
        }}
      >
        <div
          className={`bg-gradient-to-br from-gray-50/20 via-gray-100/15 to-gray-200/10 backdrop-blur-sm border border-white/10 ${variants[variant]}`}
          style={{
            width: `${size}px`,
            height: `${size * aspectRatio}px`,
            filter: `blur(${blur}px)`,
            opacity: Math.max(0.03, opacity - scrollY * 0.0001),
            boxShadow: '0 0 60px rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Smooth Glass Scrolling Background */}
      <div className="fixed inset-0 z-0">
        {/* Large background elements */}
        <GlassScrollElement initialX={85} initialY={15} parallaxSpeed={0.2} size={400} blur={80} opacity={0.12} variant="oval" delay={200} />
        <GlassScrollElement initialX={10} initialY={40} parallaxSpeed={-0.15} size={350} blur={70} opacity={0.1} variant="circle" delay={400} />
        <GlassScrollElement initialX={70} initialY={70} parallaxSpeed={0.25} size={300} blur={60} opacity={0.08} variant="rounded" delay={600} />
        
        {/* Medium floating elements */}
        <GlassScrollElement initialX={30} initialY={25} parallaxSpeed={-0.3} size={220} blur={45} opacity={0.1} variant="oval" delay={800} />
        <GlassScrollElement initialX={90} initialY={60} parallaxSpeed={0.35} size={180} blur={40} opacity={0.09} variant="circle" delay={1000} />
        <GlassScrollElement initialX={5} initialY={75} parallaxSpeed={-0.2} size={250} blur={50} opacity={0.07} variant="rounded" delay={1200} />
        
        {/* Small accent elements */}
        <GlassScrollElement initialX={50} initialY={10} parallaxSpeed={0.4} size={120} blur={25} opacity={0.06} variant="circle" delay={1400} />
        <GlassScrollElement initialX={95} initialY={35} parallaxSpeed={-0.25} size={140} blur={30} opacity={0.05} variant="oval" delay={1600} />
        <GlassScrollElement initialX={20} initialY={85} parallaxSpeed={0.3} size={100} blur={20} opacity={0.04} variant="rounded" delay={1800} />
        <GlassScrollElement initialX={75} initialY={5} parallaxSpeed={-0.35} size={160} blur={35} opacity={0.06} variant="circle" delay={2000} />
      </div>

      {/* Navbar */}
      <div className={`transform transition-all duration-700 ease-out ${
        isVisible.navbar ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}>
        <LandingNavbar onGetStarted={onGetStarted} />
      </div>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 pt-20 z-10">
        <div className={`text-center max-w-5xl transform transition-all duration-700 ease-out ${
          isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          {/* Title - Apple Style */}
          <h1 className="text-5xl md:text-8xl font-thin mb-6 text-gray-900 tracking-tight leading-tight">
            {titleText}
          </h1>

          {/* Subtitle - Apple Style */}
          <p className={`text-xl md:text-3xl text-gray-500 mb-12 font-light max-w-4xl mx-auto leading-relaxed transform transition-all duration-700 delay-300 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            The most advanced platform for connecting talent with opportunity.
          </p>

          {/* CTA Buttons - Apple Style */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-700 delay-500 ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button 
              onClick={onGetStarted}
              className="px-8 py-3 text-white bg-black hover:bg-gray-900 hover:scale-105 hover:shadow-lg rounded-full transition-all duration-300 font-medium text-lg transform"
            >
              Get Started
            </button>
            <button 
              className="px-8 py-3 text-black border border-gray-300 hover:border-gray-400 hover:scale-105 hover:shadow-md rounded-full transition-all duration-300 font-medium text-lg transform"
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Scroll indicator - Apple Style */}
        <div 
          ref={scrollIndicatorRef}
          className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-out ${
            isVisible.scrollIndicator ? 'translate-y-0' : 'translate-y-4 opacity-0'
          }`}
          style={{
            opacity: isVisible.scrollIndicator 
              ? Math.max(0, 0.6 - (scrollY / window.innerHeight) * 1.5) 
              : 0,
            transform: `translateX(-50%) translateY(${scrollY * 0.3}px) scale(${Math.max(0.8, 1 - (scrollY / window.innerHeight) * 0.5)})`
          }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center hover:border-gray-400 transition-colors duration-300">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-32 px-4 bg-gray-50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-20 transform transition-all duration-700 ease-out ${
            isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-thin mb-4 text-gray-900 tracking-tight">
              Why Echelon?
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-light">Three reasons that set us apart.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                title: "Intuitive",
                description: "Connect naturally with opportunities that match your skills and aspirations."
              },
              {
                title: "Intelligent", 
                description: "Advanced algorithms learn your preferences to deliver personalized matches."
              },
              {
                title: "Immediate",
                description: "Get real-time notifications when companies show interest in your profile."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ease-out ${
                  isVisible.features 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-2xl md:text-3xl font-light mb-6 text-gray-900">{feature.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" ref={statsRef} className="py-32 px-4 bg-white relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transform transition-all duration-700 ease-out ${
            isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-6xl font-thin mb-16 text-gray-900 tracking-tight">
              By the numbers
            </h2>
            
            <div className="grid md:grid-cols-3 gap-16">
              {[
                { number: "50K+", label: "Professionals connected" },
                { number: "1K+", label: "Partner companies" },
                { number: "95%", label: "Match satisfaction" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`text-center transform transition-all duration-700 ease-out ${
                    isVisible.stats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="text-4xl md:text-6xl font-thin mb-4 text-gray-900 hover:text-gray-700 transition-colors duration-300">{stat.number}</div>
                  <div className="text-lg md:text-xl text-gray-500 font-light">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="cta" ref={ctaRef} className="py-16 px-4 bg-gray-900 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-700 ease-out ${
            isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <h2 className={`text-3xl md:text-5xl font-thin mb-6 text-white tracking-tight leading-tight transform transition-all duration-700 ease-out delay-200 ${
              isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Ready to get started?
            </h2>
            <p className={`text-lg md:text-xl text-gray-200 mb-8 font-light max-w-2xl mx-auto leading-relaxed transform transition-all duration-700 ease-out delay-400 ${
              isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              Experience the future of career connections.
            </p>
            <div className={`transform transition-all duration-700 ease-out delay-600 ${
              isVisible.cta ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <button 
                onClick={onGetStarted}
                className="px-8 py-3 text-black bg-white hover:bg-gray-100 hover:scale-105 hover:shadow-2xl rounded-full transition-all duration-300 font-medium text-base shadow-xl transform"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
