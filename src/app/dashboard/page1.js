'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/dashboardComponents/Sidebar';
import MainContent from '@/components/dashboardComponents/MainContent';
import MobileMenu from '@/components/dashboardComponents/MobileMenu';
import { faHome, faGift, faStore, faWallet, faExchangeAlt, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { icon: faHome, label: 'Inicio', href: '#' },
    { icon: faGift, label: 'Recompensas', href: '#' },
    { icon: faStore, label: 'Sucursales', href: '#' },
    { icon: faWallet, label: 'Billetera', href: '#' },
    { icon: faExchangeAlt, label: 'Transacciones', href: '#' },
    { icon: faUser, label: 'Mi cuenta', href: '#' },
    { icon: faSignOutAlt, label: 'Cerrar sesión', href: '#' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-1">
          <Sidebar isOpen={isSidebarOpen} />
          <MainContent />
        </div>
      </div>
      <div>
        <MobileMenu
          menuItems={menuItems}
          isOpen={isMobileMenuOpen}
          toggleMenu={toggleMobileMenu}
          title="Menu"
        />
      </div>
    </div>
  );
};

export default Home;
