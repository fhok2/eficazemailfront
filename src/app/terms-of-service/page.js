import React from 'react';

import { ScrollText, Shield, UserCheck, Lock, Server, Mail, Clock } from 'lucide-react';
const Section = ({ title, content, icon }) => (
  <div className="bg-background-secondary rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-xl font-semibold ml-3">{title}</h2>
    </div>
    <p className="text-text-secondary">{content}</p>
  </div>
);

const TermsOfUsePage = () => {
  const sections = [
    { title: "Introdução", content: "A EficazMail é um sistema de redirecionamento de e-mails que opera de forma automatizada, direcionando e-mails do endereço gerado para o endereço de e-mail cadastrado pelo usuário. Este Termo de Uso e Responsabilidade estabelece as condições para o uso do sistema EficazMail e os direitos e obrigações dos usuários ao acessarem e utilizarem nossos serviços. Ao utilizar o EficazMail, você concorda com estes termos.", icon: <ScrollText className="w-8 h-8 text-primary" /> },
    { title: "Aceitação dos Termos", content: "Ao criar uma conta e utilizar o EficazMail, você concorda com todos os termos e condições aqui estabelecidos. Caso não concorde com algum dos termos, por favor, não utilize o nosso sistema.", icon: <Shield className="w-8 h-8 text-primary" /> },
    { title: "Serviços Prestados", content: "O EficazMail oferece serviços de redirecionamento de e-mails de forma automatizada. Os dados fornecidos durante o cadastro são utilizados exclusivamente para autenticação, acesso ao sistema e operação do serviço de redirecionamento de e-mails.", icon: <UserCheck className="w-8 h-8 text-primary" /> },
    { title: "Uso dos Dados", content: "Os dados coletados durante o cadastro incluem: Nome, E-mail, Senha e Telefone. Estes dados são necessários para a criação de sua conta e para garantir a segurança e personalização do serviço oferecido.", icon: <Lock className="w-8 h-8 text-primary" /> },
    { title: "Segurança dos Dados", content: "Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra perda, uso indevido e acesso não autorizado. No entanto, nenhum método de transmissão ou armazenamento eletrônico é 100% seguro, e não podemos garantir segurança absoluta.", icon: <Server className="w-8 h-8 text-primary" /> },
    { title: "Responsabilidades do Usuário", content: "Fornecer informações precisas e verdadeiras durante o cadastro. Manter a confidencialidade de sua senha e informações de login. Não utilizar o sistema para fins ilícitos ou que possam causar danos a terceiros.", icon: <UserCheck className="w-8 h-8 text-primary" /> },
    { title: "Limitações de Responsabilidade", content: "O EficazMail não se responsabiliza por falhas na entrega ou no redirecionamento de e-mails decorrentes de problemas técnicos alheios ao nosso controle. Não garantimos a disponibilidade ininterrupta do serviço, podendo haver interrupções para manutenção, atualizações ou por problemas técnicos. Não nos responsabilizamos pelo conteúdo dos e-mails redirecionados.", icon: <Shield className="w-8 h-8 text-primary" /> },
    { title: "Modificações dos Termos", content: "Podemos alterar estes termos de uso periodicamente para refletir mudanças em nossas práticas ou em conformidade com a legislação aplicável. Notificaremos os usuários sobre quaisquer mudanças significativas através do nosso site ou por e-mail.", icon: <Clock className="w-8 h-8 text-primary" /> },
    { title: "Contato", content: "Se você tiver dúvidas ou preocupações sobre estes termos de uso ou sobre nossas práticas, entre em contato conosco pelo e-mail: contato@eficazmail.com.", icon: <Mail className="w-8 h-8 text-primary" /> },
  ];

  return (
    <div className="min-h-screen bg-transparent text-text-main z-40 relative">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-radial-gradient-hero-title bg-clip-text text-transparent mt-20">Termo de Uso e Responsabilidade</h1>
        <p className="text-lg mb-8 text-center text-text-secondary">Última atualização: {new Date().toLocaleDateString()}</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Section key={index} title={section.title} content={section.content} icon={section.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
