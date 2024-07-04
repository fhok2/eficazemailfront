'use client'

import React, { useState } from 'react';
import { Mail, Shield, Settings } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-brand-dark text-white overflow-hidden">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-brand-dark opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-brand-dark opacity-30"></div>
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              EficazMail
            </span>
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Proteja sua privacidade online com nossa plataforma futurista de redirecionamento de e-mails.
          </p>
          <a
            href="#"
            className="bg-gradient-to-r from-teal-400 to-brand-light text-white font-bold py-4 px-8 rounded-full text-lg hover:shadow-lg hover:scale-105 transition duration-300 inline-block animate-fade-in-up animation-delay-400"
          >
            Comece agora
          </a>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Mail className="w-16 h-16" />}
              title="E-mails ilimitados"
              description="Gere quantos e-mails de redirecionamento você precisar"
            />
            <FeatureCard
              icon={<Settings className="w-16 h-16" />}
              title="Controle total"
              description="Ative, desative e atualize seus redirecionamentos a qualquer momento"
            />
            <FeatureCard
              icon={<Shield className="w-16 h-16" />}
              title="Proteção contra spam"
              description="Evite spam e proteja seu e-mail principal em cadastros online"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="text-center p-8 bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex justify-center mb-6 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
        {React.cloneElement(icon, { className: `w-16 h-16 text-teal-400 ${isHovered ? 'animate-pulse' : ''}` })}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-teal-300">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default HeroSection;