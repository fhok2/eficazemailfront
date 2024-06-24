// src/components/ReusableHeading.js
import React from 'react';

const ReusableHeading = ({ children }) => {
  return (
    <h1 className="bg-radial-gradient-hero-title  bg-clip-text text-center text-[2.5rem] sm:text-[3.9rem] md:text-[4.0rem] lg:text-8xl  xl:text-[5.75rem] leading-[2.9rem] sm:leading-[3.5rem] md:leading-[3.9rem] font-bold tracking-[-0.04rem] xl:tracking-[-0.115rem] text-transparent drop-shadow-sm p-10">
      {children}
    </h1>
  );
};

export default ReusableHeading;
