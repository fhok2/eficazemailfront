import React from 'react';
import { Shield, UserX, Search, Zap, Mail, Settings } from 'lucide-react';

const FeatureItem = ({ icon, title, description, index }) => (
  <div className={`flex flex-col items-center text-center p-8 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:bg-opacity-90 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}>
    <div className="flex justify-center mb-6 transition-transform duration-300 hover:scale-110">
      {React.cloneElement(icon, { className: "w-16 h-16 text-teal-400 hover:animate-pulse" })}
    </div>
    <h3 className="text-2xl font-semibold mb-4 text-teal-300">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const EficazMailFeatures = () => {
  const features = [
    {
      icon: <Shield />,
      title: "Proteção Inigualável",
      description: "Sistema de redirecionamento inteligente que cria inúmeros e-mails únicos como escudos para seu e-mail principal."
    },
    {
      icon: <UserX />,
      title: "Anonimato Sob Demanda",
      description: "Gere e-mails exclusivos em segundos para cadastros, newsletters, sem expor seu e-mail principal."
    },
    {
      icon: <Search />,
      title: "Detetive de Vazamentos",
      description: "Cada e-mail criado tem uma 'etiqueta' única para rastrear vazamentos de informações."
    },
    {
      icon: <Zap />,
      title: "Controle Total em Tempo Real",
      description: "Painel de controle avançado para ativar, desativar ou redirecionar seus e-mails com facilidade."
    },
    {
      icon: <Mail />,
      title: "E-mails Ilimitados",
      description: "Gere quantos e-mails de redirecionamento você precisar."
    },
    {
      icon: <Settings />,
      title: "Personalização Completa",
      description: "Ative, desative e atualize seus redirecionamentos a qualquer momento."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center animate-fade-in-up">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
          Revolucione sua Vida Digital
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
      </div>
      <div className="text-center">
        <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-up animation-delay-200 max-w-3xl mx-auto">
          O EficazMail não é apenas um produto. É uma revolução na forma como interagimos com o mundo digital. 
          É privacidade, é controle, é liberdade. É o futuro do e-mail, e esse futuro começa agora!
        </p>
        <a href="/login" className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-teal-400 to-brand-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
          Comece Agora
        </a>
      </div>
    </div>
  </section>
);
};

export default EficazMailFeatures;