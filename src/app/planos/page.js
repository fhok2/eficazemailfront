'use client';
import React from 'react';
import PricingSection from '@/components/PricingSection';

const Pricing = () => {

  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between mt-20">
      <div>
      <h1
  className="gradient-text text-center font-semibold leading-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl"
  style={{
    backgroundImage:
      "linear-gradient(105deg, rgb(223, 223, 223) 39.15%, rgba(223, 223, 223, 0.67) 80.99%, rgba(223, 223, 223, 0) 119.58%)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  }}
>
Planos e preços
</h1>
<h3 className="mt-10 text-center text-sm  font-normal opacity-70 sm:text-lg mx-10 sm:opacity-100 lg:text-base">
        Crie emails descartáveis e receba tudo em sua caixa de entrada principal  com segurança e privacidade.
        </h3>
      </div>
     <PricingSection />
    </div>
  );
};

export default Pricing;
