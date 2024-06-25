
import React from 'react';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import EmailForwardingForm from '@/components/EmailForwardingForm';
import EficazMailFeatures from '@/components/Features';


const Home = () => {
  return (
    
      <div className="bg-black min-h-screen flex flex-col justify-between">
        <main>
          <div></div>
          <HeroSection />
          <EficazMailFeatures />
          <PricingSection />
          <div id="testefree" >
        
            <EmailForwardingForm />
          </div>
        </main>
      </div>
    
  );
};

export default Home;