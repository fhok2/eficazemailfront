"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import NavMenu from "./menu/NavMenu";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: "Planos", href: "#plain" },
    { label: "FAQ", href: "#faq" },
    { label: "Login", href: "/dashboard" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-brand-light">
                EficazMail
              </span>
            </Link>
          </div>
          
          {!isMobile && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {menuItems.map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  className={`ml-8 whitespace-nowrap text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 ${
                    item.label === "Login" ? "bg-gradient-to-r from-teal-400 to-brand-light hover:from-teal-500 hover:to-brand-dark text-white px-4 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          
          {isMobile && (
            <div className="md:hidden">
              <NavMenu />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;