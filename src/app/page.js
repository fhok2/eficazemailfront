import React from 'react';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import EmailForwardingForm from '@/components/EmailForwardingForm';
import EficazMailFeatures from '@/components/Features';
import AnimatedBackground from '@/components/AnimatedBackground';
import FAQ from '@/components/Faq';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <main className="relative z-30">
        <HeroSection />
        <EficazMailFeatures />
        <PricingSection />
        <FAQ />
      </main>
    </div>
  );
};

export default Home;