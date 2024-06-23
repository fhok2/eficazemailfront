"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: "Planos", href: "/planos" },
    { label: "FAQ", href: "/faq" },
    { label: "Login", href: "/dashboard" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Defina o breakpoint desejado
    };

    handleResize(); // Verifique o tamanho da tela no carregamento inicial

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-custom-bg z-50 fixed w-screen text-secondary py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <div className="text-xl font-bold">EficazMail</div>
      </Link>
      {!isMobile && (
        <div className=" md:flex space-x-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-accent3 transition duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
      {isMobile && (
        <div className="md:hidden">
          <button
            className="text-secondary focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {!isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 transition-all duration-300 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 z-50 fill-current transition-all duration-300 ease-in-out"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              </svg>
            )}
          </button>
          <MobileMenu
            menuItems={menuItems}
            isOpen={isMobileMenuOpen}
            toggleMenu={toggleMobileMenu}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;