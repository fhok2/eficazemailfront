"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import NavMenu from "./menu/NavMenu";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

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
        <div className=" md:flex space-x-4  mr-4">
          <ul className="flex gap-4  w-96 justify-between text-white">
            <div className="flex items-center gap-4">
              <Link 
              className="text-white hover:text-gray-200 hover:bg-gray-800 px-6 py-2 rounded-md"
              href="/planos">
                <li >Planos</li>
              </Link>
              <Link 
              className="text-white hover:text-gray-200 hover:bg-gray-800 px-6 py-2 rounded-md"
              href="/faq">
                <li>FAQ</li>
              </Link>
            </div>
            <Link 
            className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-md text-gray-100  font-medium"
            href="/dashboard">
              <li>Login</li>
            </Link>
          </ul>
        </div>
      )}
      {isMobile && (
        <div className="md:hidden">
          <NavMenu />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
