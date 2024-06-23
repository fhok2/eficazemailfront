"use client";
import React from "react";
import PricingSection from "@/components/PricingSection";
import ReusableHeading from "@/components/component/ReusableComponents/ReusableHeading";
import ReusableParagraph from "@/components/component/ReusableComponents/ReusableParagraph";

const Pricing = () => {
  return (
    <div className="custom-bg min-h-screen flex flex-col justify-between ">
      <div>
        <ReusableHeading>Nossos planos e preços</ReusableHeading>
        <ReusableParagraph>
          Crie um email personalizado para cada novo cadastro e receba tudo em sua caixa de entrada
          principal com segurança e privacidade, controlando suas informações e dados.
        </ReusableParagraph>
      </div>
      <PricingSection />
    </div>
  );
};

export default Pricing;
