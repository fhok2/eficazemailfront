import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const MobileMenu = ({ menuItems = [], isOpen, toggleMenu }) => {
  const handleLinkClick = () => {
    toggleMenu(); // Fechar o menu quando um link é clicado
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{opacity: 0 }}
          animate={{ delay: 0.4,opacity: 1 }}
          exit={{
            
            opacity: 0,
            transition: { 
              delay: 0.4, // Atraso de 0.3 segundos antes de iniciar a animação de saída
              duration: 0.3
            }
          }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 top-16  opacity- flex justify-center items-center"
        >
          <div className="absolute inset-0 bg-white opacity-80" onClick={toggleMenu} />
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: -80, opacity: 1 }}
            exit={{
              y: -100,
              opacity: 0,
              transition: { 
                delay: 0.3, // Atraso de 0.3 segundos antes de iniciar a animação de saída
                duration: 0.5
              }
            }}
            transition={{ duration: 0.8 }}
            className={`bg-gray-800 rounded-lg p-10 z-50 flex flex-col space-y-5 absolute top-10 left-0 right-0 w-11/12 min-h-[250px] mx-auto mt-20 items-center justify-center`}
          >
            {menuItems.map((item, index) => (
              <Link 
              key={index} 
              href={item.href} 
              onClick={handleLinkClick}
              className='text-lg hover:bg-gray-950 transition-all ease-in duration-500 hover:text-primary px-4 hover:py-2 rounded-md'
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;