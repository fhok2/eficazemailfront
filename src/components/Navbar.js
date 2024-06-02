'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MobileMenu from '@/components/MobileMenu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: 'Planos', href: '/planos' },
    { label: 'FAQ', href: '/faq' },
    // { label: 'Dashboard', href: '/dashboard' },
  
  ];

  return (
    <nav className="bg-custom-bg text-secondary py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <div className="text-xl font-bold">EficazMail</div>
      </Link>
      <div className="hidden md:flex space-x-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-accent3 transition duration-300">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="md:hidden">
        <button 
          className="text-secondary focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <MobileMenu 
        menuItems={menuItems}
        isOpen={isMobileMenuOpen}
        toggleMenu={toggleMobileMenu}
        title="Menu"
      />
    </nav>
  );
};

export default Navbar;
