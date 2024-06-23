// app/Nav.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="hidden lg:flex items-center justify-end">
        <ul className="flex items-center mr-10">
          <li className="font-heading mr-9 text-white hover:text-gray-200 text-lg">
            <Link href="#">Features</Link>
          </li>
          <li className="font-heading mr-9 text-white hover:text-gray-200 text-lg">
            <Link href="#">Solutions</Link>
          </li>
          <li className="font-heading mr-9 text-white hover:text-gray-200 text-lg">
            <Link href="#">Resources</Link>
          </li>
          <li className="font-heading text-white hover:text-gray-200 text-lg">
            <Link href="#">Pricing</Link>
          </li>
        </ul>
        <button className="font-heading py-3.5 px-5 uppercase text-xs tracking-px text-white font-bold bg-white bg-opacity-20 hover:bg-opacity-10 transition ease-in rounded-10">
          Start Free Trial
        </button>
      </nav>
      <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <svg
          className="navbar-burger text-gray-800"
          width="51"
          height="51"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="56" height="56" rx="28" fill="currentColor"></rect>
          <path
            d="M37 32H19M37 24H19"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="navbar-menu fixed top-0 left-0 bottom-0 w-4/6 sm:max-w-xs z-50">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80"></div>
          <nav className="relative z-10 px-9 py-8 bg-white h-full">
            <div className="flex flex-wrap justify-between h-full">
              <div className="flex items-center justify-between w-full">
                <Link href="/">
                  <Image
                    src="/gradia-assets/logos/gradia-name-black.svg"
                    alt="Logo"
                    width={150}
                    height={50}
                  />
                </Link>
                <button className="navbar-burger" onClick={() => setIsOpen(!isOpen)}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6L18 18"
                      stroke="#111827"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
              <ul className="flex flex-col justify-center py-8 w-full">
                <li className="mb-12">
                  <Link href="#" legacyBehavior>
                    <a className="font-heading font-medium text-lg text-gray-900 hover:text-gray-700">
                      Features
                    </a>
                  </Link>
                </li>
                <li className="mb-12">
                  <Link href="#" legacyBehavior>
                    <a className="font-heading font-medium text-lg text-gray-900 hover:text-gray-700">
                      Solutions
                    </a>
                  </Link>
                </li>
                <li className="mb-12">
                  <Link href="#" legacyBehavior>
                    <a className="font-heading font-medium text-lg text-gray-900 hover:text-gray-700">
                      Resources
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#" legacyBehavior>
                    <a className="font-heading font-medium text-lg text-gray-900 hover:text-gray-700">
                      Pricing
                    </a>
                  </Link>
                </li>
              </ul>
              <div className="flex flex-col justify-end w-full">
                <button className="p-0.5 font-heading block w-full text-lg text-gray-900 font-medium rounded-10">
                  <div className="py-2 px-5 rounded-10">
                    <p>Login</p>
                  </div>
                </button>
                <button className="group relative p-0.5 font-heading block w-full text-lg text-gray-900 font-medium bg-gradient-cyan overflow-hidden rounded-10">
                  <div className="absolute top-0 left-0 transform -translate-y-full group-hover:-translate-y-0 h-full w-full bg-gradient-cyan transition ease-in-out duration-500"></div>
                  <div className="py-2 px-5 bg-white rounded-lg">
                    <p className="relative z-10">Start Free Trial</p>
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Nav;