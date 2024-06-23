// page.js
import React from 'react';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import EmailForwardingForm from '@/components/EmailForwardingForm';
import HeroSection1 from '@/components/HeroSectin1';


const Home = () => {
  return (
    
      <div className="bg-black min-h-screen flex flex-col justify-between">
        <main>
          <div></div>
          <HeroSection />
          <PricingSection />
          <div id="testefree" >
        
            <EmailForwardingForm />
          </div>
        </main>
      </div>
    
  );
};

export default Home;