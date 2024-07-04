import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-brand-dark"></div>
      
      {/* Animated blobs */}
      <div className="absolute inset-0">
        <div className="animate-blob1 absolute -top-48 -left-48 w-96 h-96 bg-purple-700 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="animate-blob2 absolute -bottom-48 -right-48 w-96 h-96 bg-yellow-700 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="animate-blob3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-700 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>
      
      {/* Teal overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 to-transparent"></div>
    </div>
  );
};

export default AnimatedBackground;