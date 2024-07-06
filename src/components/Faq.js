'use client'
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

const FAQItem = ({ question, answer, isOpen, toggleOpen }) => {
  return (
    <motion.div
      className="border-b border-gray-700 last:border-b-0"
      initial={false}
    >
      <motion.button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={toggleOpen}
      >
        <span className="text-lg font-semibold text-white">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-brand-light" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.p
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.4 }}
              className="py-4 text-gray-300"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const faqData = [
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

  const toggleItem = (index) => {
    setOpenItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div className='w-full h-full z-40 mt-20 '>
      <motion.div 
        ref={ref}
        id='faq'
        className="w-full max-w-6xl mx-auto bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="p-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
              Perguntas Frequentes
            </span>
          </motion.h2>
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <FAQItem
                  question={item.question}
                  answer={item.answer}
                  isOpen={openItems[index] || false}
                  toggleOpen={() => toggleItem(index)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;