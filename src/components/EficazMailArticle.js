import React from 'react';
import { Mail, Zap, Shield, UserCheck } from 'lucide-react';

const InfoCard = ({ icon, title, children, index }) => {
  return (
    <div className={`flex flex-col items-center text-center p-8 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:bg-opacity-90 ${index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'}`}>
      <div className="flex justify-center mb-6 transition-transform duration-300 hover:scale-110">
        
      </div>
      <h3 className="text-2xl font-semibold mb-8 text-teal-300">{title}</h3>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
};

const EficazMailInfo = () => {
  const infoCards = [
    {
      icon: <Mail />,
      title: "O que é o EficazMail?",
      content: (
        <>
          <p className="text-justify">
            O EficazMail é um sistema inovador de redirecionamento de e-mails que oferece 
            endereços permanentes com funcionalidades avançadas de redirecionamento e gerenciamento, 
            superando as limitações dos e-mails descartáveis tradicionais.
          </p>
          <p className="mt-2 text-justify">
            Com o EficazMail, você pode criar e gerenciar múltiplos endereços de e-mail,
            todos conectados à sua conta principal, proporcionando maior controle e organização
            da sua comunicação digital.
          </p>
        </>
      )
    },
    {
      icon: <Zap />,
      title: "Como funciona o EficazMail?",
      content: (
        <>
          <ul className="list-disc pl-5 text-justify">
            <li>Crie endereços personalizados @eficaz.email</li>
            <li>Receba mensagens redirecionadas para seu e-mail principal</li>
            <li>Categorize e controle cada endereço</li>
            <li>Ative, desative ou atualize endereços conforme necessário</li>
            <li>Responda usando o endereço @eficaz.email para manter seu e-mail principal protegido</li>
          </ul>
          <p className="mt-2 text-justify">
            O sistema inteligente do EficazMail gerencia automaticamente o redirecionamento,
            garantindo que você nunca perca uma mensagem importante, enquanto mantém sua
            caixa de entrada organizada e livre de spam indesejado.
          </p>
        </>
      )
    },
    {
      icon: <Shield />,
      title: "Por que você precisa do EficazMail?",
      content: (
        <>
          <ul className="list-disc pl-5 text-justify">
            <li>Proteção contra spam</li>
            <li>Privacidade reforçada</li>
            <li>Organização superior de e-mails</li>
            <li>Adaptabilidade às suas necessidades</li>
            <li>Endereços permanentes com controle total</li>
          </ul>
          <p className="mt-2 text-justify">
            Em um mundo digital onde a privacidade e a gestão eficiente de informações são
            cruciais, o EficazMail oferece uma solução completa para manter seu e-mail
            sob controle, protegendo sua identidade online e simplificando sua comunicação.
          </p>
        </>
      )
    },
    {
      icon: <UserCheck />,
      title: "Como usar o EficazMail?",
      content: (
        <>
          <ol className="list-decimal pl-5 text-justify">
            <li>Crie sua conta com seu e-mail principal</li>
            <li>Gere novos endereços @eficaz.email conforme necessário</li>
            <li>Use esses endereços para registros online, compras, etc.</li>
            <li>Gerencie todos os seus endereços através de um painel único</li>
            <li>Receba todas as mensagens organizadas em seu e-mail principal</li>
          </ol>
          <p className="mt-2 text-justify">
            Começar com o EficazMail é simples e rápido. Em poucos minutos, você terá
            acesso a um sistema poderoso de gerenciamento de e-mails que se adapta às
            suas necessidades e cresce com você.
          </p>
        </>
      )
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent text-white overflow-hidden h-full relative"
    id="about"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-center animate-fade-in-up">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
            A tecnologia por trás do EficazMail
          </span>
        </h2>
        <p className="mb-12 text-gray-300 text-center max-w-2xl mx-auto">
          Na era digital atual, o EficazMail oferece uma solução inovadora para os desafios 
          de gerenciamento de e-mail, spam e privacidade. Descubra como nosso sistema de 
          redirecionamento inteligente pode transformar sua experiência com e-mails.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {infoCards.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              index={index}
            >
              {card.content}
            </InfoCard>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-up animation-delay-200 max-w-3xl mx-auto">
            Experimente o EficazMail hoje e descubra uma nova forma de gerenciar seus e-mails 
            com eficiência e segurança!
          </p>
    
        </div>
      </div>
    </section>
  );
};

export default EficazMailInfo;