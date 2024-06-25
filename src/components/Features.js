import React from 'react';

const FeatureItem = ({ icon, title, description, isLast }) => (
  <div className="w-full md:w-1/2 lg:w-1/4 p-8">
    <div className="text-center">
      <div className={`relative z-10 ${isLast ? 'bg-teal-600' : 'bg-white'} w-12 h-12 mb-8 mx-auto border border-blueGray-200 rounded-full`}>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {icon}
        </div>
        {!isLast && (
          <div className="hidden lg:block absolute left-12 top-1/2 transform -translate-y-1/2 w-96 h-px bg-gray-200"></div>
        )}
      </div>
      <div className="md:max-w-xs mx-auto">
        <h3 className="mb-4 font-heading text-xl font-bold font-heading leading-normal text-white">{title}</h3>
        <p className="text-gray-400 font-medium leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const EficazMailFeatures = () => {
  const features = [
    {
      icon: '🛡️',
      title: "Proteção Inigualável",
      description: "Sistema de redirecionamento inteligente que cria inúmeros e-mails únicos como escudos para seu e-mail principal."
    },
    {
      icon: '🎭',
      title: "Anonimato Sob Demanda",
      description: "Gere e-mails exclusivos em segundos para cadastros, newsletters, sem expor seu e-mail principal."
    },
    {
      icon: '🕵️‍♂️',
      title: "Detetive de Vazamentos",
      description: "Cada e-mail criado tem uma 'etiqueta' única para rastrear vazamentos de informações."
    },
    {
      icon: '⚡',
      title: "Controle Total em Tempo Real",
      description: "Painel de controle avançado para ativar, desativar ou redirecionar seus e-mails com facilidade."
    }
  ];

  return (
    <section className="h-full w-11/12 flex flex-col justify-center m-auto pb-24  overflow-hidden">
      <div className="relative z-10 container px-4 mx-auto">
   
        <h2 className="mb-20 text-4xl md:text-4xl text-center font-bold font-heading tracking-px-n leading-tight text-white">Revolucione sua Vida Digital</h2>
        <div className="flex flex-wrap -m-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isLast={index === features.length - 1}
            />
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-300  leading-relaxed">
            O EficazMail não é apenas um produto. É uma revolução na forma como interagimos com o mundo digital. 
            É privacidade, é controle, é liberdade. É o futuro do e-mail, e esse futuro começa agora!
          </p>
         
        </div>
      </div>
    </section>
  );
};

export default EficazMailFeatures;