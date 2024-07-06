import React from 'react';
import { ScrollText, Shield, Server, Cookie, UserCheck, Clock, Lock, Mail } from 'lucide-react';


const PrivacyPolicyPage = () => {
  const sections = [
    { title: "Introdução", content: "A EficazMail valoriza sua privacidade e se compromete a proteger os dados pessoais dos usuários. Esta política de privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.", icon: <ScrollText className="w-8 h-8 text-primary" /> },
    { title: "Dados Coletados", content: "Coletamos os seguintes dados pessoais dos usuários: Nome, Email, Senha, Telefone", icon: <Shield className="w-8 h-8 text-primary" /> },
    { title: "Uso dos Dados", content: "Os dados coletados são utilizados exclusivamente para as seguintes finalidades: Acesso ao dashboard, Autenticação e login no sistema", icon: <UserCheck className="w-8 h-8 text-primary" /> },
    { title: "Compartilhamento de Dados", content: "Não compartilhamos os dados dos usuários com nenhuma entidade externa. Todas as informações são mantidas em sigilo e usadas apenas conforme descrito nesta política de privacidade.", icon: <Lock className="w-8 h-8 text-primary" /> },
    { title: "Localização dos Servidores", content: "Os dados dos usuários são armazenados em servidores localizados no Brasil.", icon: <Server className="w-8 h-8 text-primary" /> },
    { title: "Política de Cookies", content: "Não utilizamos cookies em nosso site.", icon: <Cookie className="w-8 h-8 text-primary" /> },
    { title: "Direitos dos Usuários", content: "Os usuários têm os seguintes direitos em relação aos seus dados pessoais: Acesso, Correção, Exclusão. Para exercer esses direitos, entre em contato conosco pelo email: contato@eficazmail.com.", icon: <UserCheck className="w-8 h-8 text-primary" /> },
    { title: "Retenção de Dados", content: "Os dados dos usuários são retidos apenas pelo tempo necessário para cumprir as finalidades descritas nesta política de privacidade, a menos que um período de retenção mais longo seja exigido ou permitido por lei.", icon: <Clock className="w-8 h-8 text-primary" /> },
    { title: "Segurança dos Dados", content: "Implementamos medidas de segurança técnicas e organizacionais para proteger os dados pessoais contra perda, uso indevido e acesso não autorizado. No entanto, nenhum método de transmissão ou armazenamento eletrônico é 100% seguro, e não podemos garantir segurança absoluta.", icon: <Lock className="w-8 h-8 text-primary" /> },
    { title: "Alterações nesta Política de Privacidade", content: "Podemos atualizar esta política de privacidade periodicamente para refletir mudanças em nossas práticas de privacidade. Notificaremos você sobre quaisquer mudanças publicando a nova política de privacidade em nosso site. Recomendamos que você revise esta política regularmente para se manter informado sobre como protegemos seus dados.", icon: <ScrollText className="w-8 h-8 text-primary" /> },
    { title: "Contato", content: "Se você tiver dúvidas ou preocupações sobre esta política de privacidade ou sobre nossas práticas de privacidade, entre em contato conosco pelo email: contato@eficazmail.com.", icon: <Mail className="w-8 h-8 text-primary" /> },
  ];

  return (
    <div>
  
      <div className="min-h-screen bg-transparent text-text-main z-40 relative">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center bg-radial-gradient-hero-title bg-clip-text text-transparent mt-20">Política de Privacidade para EficazMail</h1>
          <p className="text-lg mb-8 text-center text-text-secondary">Última atualização: {new Date().toLocaleDateString()}</p>
      
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <div key={index} className="bg-background-secondary rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center mb-4">
                  {section.icon}
                  <h2 className="text-xl font-semibold ml-3">{section.title}</h2>
                </div>
                <p className="text-text-secondary">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
