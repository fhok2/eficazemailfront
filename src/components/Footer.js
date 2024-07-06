import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NewFooter = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const links = [
    
    { label: "Política de Privacidade", href: "/privacy-policy" },
    { label: "Termos de Uso", href: "/terms-of-service" },
    { label: "FAQ", href: "/#faq" }
  ];

  return (
    <motion.footer 
      initial="hidden" 
      animate="visible" 
      variants={fadeIn} 
      className="bg-transparent text-secondary py-6 text-center h-32 flex flex-col items-center justify-center border-t border-gray-700"
    >
   
      <div className="flex justify-center space-x-8 mb-4">
        {links.map((link, index) => (
          <Link key={index} href={link.href} passHref>
            <motion.span 
              whileHover={{ scale: 1.1, color: "#ffffff" }}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {link.label}
            </motion.span>
          </Link>
        ))}
      </div>
      <p className="text-gray-300 hover:text-white transition-colors duration-200">
        © 2024 EficazMail. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default NewFooter;
