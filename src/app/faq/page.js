import FAQAccordion from "@/components/FAQAccordion";
import React from "react";

const faqItems = [
  {
    question: "O que é o eficaz.email?",
    answer: "O eficaz.email é um serviço que permite criar e-mails personalizados com o domínio @eficaz.email. Ele oferece uma solução prática e profissional para ter seu próprio endereço de e-mail, sem a necessidade de contratar um serviço de hospedagem ou adquirir um domínio."
  },
  {
    question: "Como funciona o eficaz.email?",
    answer: "O eficaz.email é uma plataforma baseada na web que permite criar e gerenciar e-mails personalizados. Após se cadastrar e fazer login, você pode criar um novo e-mail escolhendo um nome personalizado (por exemplo, seu_nome@eficaz.email). Esse e-mail pode ser configurado para encaminhar mensagens para outro endereço de e-mail existente."
  },
  {
    question: "Como criar um novo e-mail?",
    answer: "Para criar um novo e-mail, basta seguir estes passos:\n\n1. Faça login na plataforma eficaz.email.\n2. Acesse a seção 'Criar E-mail'.\n3. Insira o seu e-mail existente (para onde as mensagens serão encaminhadas).\n4. Escolha um nome personalizado para o seu novo e-mail (por exemplo, seu_nome).\n5. Opcionalmente, defina uma senha para o novo e-mail.\n6. Clique em 'Criar E-mail'.\n\nSeu novo e-mail personalizado (por exemplo, seu_nome@eficaz.email) será criado e configurado para encaminhar mensagens para o endereço de e-mail existente que você forneceu."
  },
  {
    question: "Quais são os planos disponíveis?",
    answer: "O eficaz.email oferece dois planos principais:\n\n1. Plano Gratuito: Permite criar até 3 e-mails personalizados.\n2. Plano Pago: Permite criar um número ilimitado de e-mails personalizados, mediante o pagamento de uma taxa anual.\n\nVocê pode começar com o plano gratuito e fazer o upgrade para o plano pago quando precisar de mais e-mails personalizados."
  },
  {
    question: "Como faço o upgrade para o plano pago?",
    answer: "Para fazer o upgrade para o plano pago, basta seguir estes passos:\n\n1. Faça login na plataforma eficaz.email.\n2. Acesse a seção 'Planos e Pagamentos'.\n3. Selecione o plano pago desejado.\n4. Conclua o processo de pagamento.\n\nUma vez que o pagamento for processado com sucesso, seu plano será atualizado automaticamente para o plano pago, permitindo que você crie um número ilimitado de e-mails personalizados."
  },
  {
    question: "Posso encaminhar e-mails para qualquer endereço?",
    answer: "Sim, você pode encaminhar e-mails recebidos no seu endereço personalizado @eficaz.email para qualquer outro endereço de e-mail existente, como Gmail, Outlook, Yahoo, etc. Basta configurar o encaminhamento durante a criação do e-mail ou posteriormente na seção de gerenciamento de e-mails."
  },
  {
    question: "Os e-mails criados são seguros?",
    answer: "Sim, o eficaz.email utiliza protocolos de segurança padrão da indústria para garantir a privacidade e a segurança dos seus e-mails. Todas as comunicações são criptografadas, e sua conta é protegida por uma senha segura."
  },
  {
    question: "Posso cancelar ou alterar o encaminhamento de um e-mail?",
    answer: "Certamente! Você tem total controle sobre os e-mails criados na plataforma eficaz.email. É possível cancelar o encaminhamento de um e-mail a qualquer momento, bem como alterar o endereço de destino para onde as mensagens são encaminhadas."
  },
  {
    question: "O eficaz.email é compatível com todos os clientes de e-mail?",
    answer: "Sim, os e-mails criados no eficaz.email são compatíveis com todos os clientes de e-mail populares, como Gmail, Outlook, Yahoo Mail, Apple Mail, entre outros. Você pode configurar seu cliente de e-mail para enviar e receber mensagens usando seu novo endereço personalizado @eficaz.email."
  }
];
const Faq = () => {
  return (
    <section className="m-auto flex w-full max-w-4xl flex-col items-center mt-20">
      <h1
        className="gradient-text text-center font-semibold leading-10 text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgb(223, 223, 223) 39.15%, rgba(223, 223, 223, 0.67) 80.99%, rgba(223, 223, 223, 0) 119.58%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Perguntas Frequentes
      </h1>
      <div className="mx-auto mt-20 px-10 text-center  max-w-[500px] ">
        <p className="mt-4 leading-7 text-gray-200  text-sm">
          Não consegue encontrar a resposta que procura? Entre em contato com
          nossa equipe de suporte.
        </p>
      </div>
      <aside className=" min-h-screen flex flex-col justify-between container mx-auto px-5">
        <FAQAccordion items={faqItems} />
      </aside>
    </section>
  );
};

export default Faq;
