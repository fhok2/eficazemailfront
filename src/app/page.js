// page.js
import React from 'react';
import HeroSection from '@/components/HeroSection';
import PricingSection from '@/components/PricingSection';
import EmailForwardingForm from '@/components/EmailForwardingForm';
import AddCookierToken from '@/components/addCokierToken';

const Home = () => {
  return (
    <AddCookierToken>
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
    </AddCookierToken>
  );
};

export default Home;