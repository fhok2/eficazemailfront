// src/components/ReusableComponents/ReusableParagraph.js
import React from 'react';

const ReusableParagraph = ({ children }) => {
  return (
    <p className="mb-[1.5rem] text-center text-[1rem] leading-[160%] text-[#C3C3C3] drop-shadow-sm px-4 xl:mb-[2.5rem] xl:px-[9rem] xl:text-[1.5rem]">
      {children}
    </p>
  );
};

export default ReusableParagraph;
