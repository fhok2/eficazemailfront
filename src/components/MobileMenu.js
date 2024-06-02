import React from 'react';
import Link from 'next/link';

const MobileMenu = ({ menuItems = [], title = "Menu", isOpen, toggleMenu, buttonClassName = "", menuClassName = "" }) => {
  return (
    <div
      className={`fixed inset-0 z-20 bg-gray-800 text-white transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:hidden ${menuClassName}`}
    >
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <button
          className={`text-white focus:outline-none ${buttonClassName}`}
          onClick={toggleMenu}
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
            />
          </svg>
        </button>
      </div>
      <nav className="mt-10">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.href} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white" onClick={toggleMenu}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
