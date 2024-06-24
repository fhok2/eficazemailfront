import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative pb-24 bg-gray-900 overflow-hidden">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-3xl">
          <div className="pl-8 md:pl-12 lg:pl-24 border-l-2 border-gray-700 mb-16">
            <h1 className="font-heading text-4xl xs:text-6xl md:text-8xl xl:text-10xl font-bold text-white mb-8 sm:mb-14">
              <span>Proteja sua</span>
              <span className="font-serif italic"> Privacidade Online</span>
            </h1>
          </div>
          <div className="lg:flex mb-20 items-center">
            <div className="max-w-md mb-12 lg:mb-0 lg:mr-8">
              <p className="text-xl font-semibold text-gray-300">EficazMail oferece redirecionamento inteligente de e-mails para proteger sua privacidade e controlar sua comunicação digital.</p>
            </div>
            <div>
              <a className="inline-block w-full sm:w-auto py-4 px-6 text-orange-50 font-semibold bg-blue-800 rounded-md hover:bg-orange-900 transition duration-200" href="#">
                Comece Agora
              </a>
            </div>
          </div>
        </div>
        <div className="lg:flex items-center justify-between">
          <div className="flex mb-12 lg:mb-0 items-center">
            <div>
              <span className="text-3xl sm:text-5xl font-semibold text-orange-900">100%</span>
              <span className="block text-sm text-gray-400">Privacidade</span>
            </div>
            <div className="h-12 w-px mx-14 bg-orange-300"></div>
            <div>
              <span className="text-3xl sm:text-5xl font-semibold text-orange-900">24/7</span>
              <span className="block text-sm text-gray-400">Controle Total</span>
            </div>
          </div>
          <div className="flex">
            <div className="max-w-sm xl:max-w-lg">
              <p className="text-gray-400">Crie e-mails personalizados, gerencie redirecionamentos e proteja-se contra spam e vazamento de dados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;