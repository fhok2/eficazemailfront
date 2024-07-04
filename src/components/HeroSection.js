"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Shield, Settings, ArrowRight } from 'lucide-react';

const TypingEffect = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const sequence = [
    "Proteja-se contra spam e vazamento de dados.",
    "Gerencie facilmente seus e-mails no dashboard.",
    "Crie múltiplos e-mails de redirecionamento.",
    "Identifique a origem de cada e-mail com marcações personalizadas.",
  ];
  const fullText = sequence[currentIndex];
  const [text, setText] = useState("");

  useEffect(() => {
    let interval;

    const startDeletion = () => {
      setIsDeleting(true);
      setShowCursor(false);
    };

    if (!isDeleting) {
      interval = setInterval(() => {
        setText((prev) =>
          prev.length === fullText.length ? prev : prev + fullText[prev.length]
        );
        if (text.length === fullText.length) {
          setTimeout(startDeletion, 4000);
        }
      }, 100);
    } else {
      interval = setInterval(() => {
        setText((prev) => prev.slice(0, prev.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) =>
            prevIndex === sequence.length - 1 ? 0 : prevIndex + 1
          );
          setShowCursor(true);
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [currentIndex, isDeleting, fullText, text, sequence.length]);

  return (
    <div className="my-4 h-16 text-center text-sm text-white sm:mt-10 sm:text-left sm:text-sm md:my-8 md:h-auto lg:my-12">
      <p style={{ fontSize: "14px", lineHeight: "20px" }}>
        <span className="text-white md:text-sm text-xs">{text}</span>
        {showCursor && (
          <span className="blinking-cursor" style={{ height: "14px" }}>
            |
          </span>
        )}
      </p>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex w-full flex-col items-center justify-center px-4 py-20 mx-auto bg-transparent text-white overflow-hidden">
  
      
      <div className="relative z-10 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
            EficazMail
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed mb-8 animate-fade-in-up animation-delay-200 max-w-2xl">
          Proteja sua privacidade online com redirecionamento inteligente de e-mails. 
          Mantenha o controle total sobre sua comunicação digital.
        </p>

        <div className="flex h-20 mb-8">
          <TypingEffect />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/login" legacyBehavior>
            <a className="group flex items-center justify-center px-8 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-teal-400 to-brand-light hover:shadow-lg hover:scale-105 ">
              Experimente Grátis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Link>
          <a href="#faq" className="flex items-center justify-center px-8 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 border-2 border-white hover:bg-white hover:text-gray-900">
            Saiba Mais
          </a>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 text-center ">
  {[
    { icon: <Mail className="w-6 h-6 sm:w-12  sm:h-12 mb-1 sm:mb-4" />, title: "E-mails Ilimitados" },
    { icon: <Shield className="w-6 h-6 sm:w-12 sm:h-12 mb-1 sm:mb-4 " />, title: "Proteção Avançada" },
    { icon: <Settings className="w-6 h-6 sm:w-12 sm:h-12 mb-1 sm:mb-4" />, title: "Controle Total" },
  ].map((feature, index) => (
    <div key={index} className="flex flex-col items-center p-3 sm:p-6 bg-gray-800 bg-opacity-50 rounded-lg backdrop-filter backdrop-blur-lg">
      {feature.icon}
      <h3 className="text-sm sm:text-xl font-semibold">{feature.title}</h3>
    </div>
  ))}
</div>
    </section>
  );
};

export default HeroSection;