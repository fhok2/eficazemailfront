'use client'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faBell, faUser, faHome, faGift, faStore, faWallet,
  faExchangeAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const SidebarItem = ({ icon, text, href }) => (
  <a href={href} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group">
    <FontAwesomeIcon icon={icon} />
    <span>{text}</span>
  </a>
);

const Sidebar = ({ sidebarOpen }) => (
  <div id="sidebar" className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} bg-white w-64 h-full fixed top-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
    <div className="p-4 space-y-4">
      <SidebarItem icon={faHome} text="Inicio" href="#" />
      <SidebarItem icon={faGift} text="Recompensas" href="#" />
      <SidebarItem icon={faStore} text="Sucursalses" href="#" />
      <SidebarItem icon={faWallet} text="Billetera" href="#" />
      <SidebarItem icon={faExchangeAlt} text="Transacciones" href="#" />
      <SidebarItem icon={faUser} text="Mi cuenta" href="#" />
      <SidebarItem icon={faSignOutAlt} text="Cerrar sesión" href="#" />
    </div>
  </div>
);

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-white border-b border-gray-300 fixed top-0 left-0 w-full z-50">
    <div className="flex justify-between items-center px-9">
      <button id="menu-button" className="lg:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="text-cyan-500 text-lg" />
      </button>
      <div className="space-x-4">
        <button>
          <FontAwesomeIcon icon={faBell} className="text-cyan-500 text-lg" />
        </button>
        <button>
          <FontAwesomeIcon icon={faUser} className="text-cyan-500 text-lg" />
        </button>
      </div>
    </div>
  </nav>
);

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar sidebarOpen={sidebarOpen} />
        <main className="flex-grow lg:ml-64 mt-16 p-6 pb-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
