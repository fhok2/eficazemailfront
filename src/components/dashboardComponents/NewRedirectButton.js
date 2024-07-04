import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const NewRedirectButton = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="group flex items-center justify-center space-x-1 sm:space-x-2 bg-primary text-primary-foreground px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-base"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="relative"
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.3 }}
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
      </motion.span>
      <span className="font-medium hidden xs:inline">
        <span className="hidden sm:inline">Novo </span>
        Redirecionamento
      </span>
      {/* <motion.div
        className="absolute inset-0 rounded-md bg-white opacity-0 group-hover:opacity-25 transition-opacity duration-300"
        initial={false}
        whileHover={{ scale: 1.05 }}
      /> */}
    </motion.button>
  );
};

export default NewRedirectButton;