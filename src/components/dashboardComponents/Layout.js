"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faUser,
  faHome,
  faGift,
  faStore,
  faWallet,
  faExchangeAlt,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "@/services/authService";
import { motion, AnimatePresence } from "framer-motion";

const SidebarItem = ({ icon, text, href, className, onClick, isLoading }) => (
  <a
    href={href}
    className={
      className ||
      "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 group"
    }
    onClick={onClick}
  >
    {isLoading ? (
      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-500"></div>
    ) : (
      <FontAwesomeIcon icon={icon} />
    )}
    <span>{text}</span>
  </a>
);

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      const result = await logout();
      if (result.error) {
        console.error(result.message);
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>
      <div
        className={`bg-white w-64 h-full fixed top-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex flex-col justify-between space-y-4 h-full">
          <div>
            <button
              onClick={closeSidebar}
              className="lg:hidden absolute top-4 right-4"
            >
              <FontAwesomeIcon icon={faTimes} className="text-gray-500" />
            </button>
            <SidebarItem icon={faHome} text="Inicio" href="#" />
            <SidebarItem
              icon={faExchangeAlt}
              text="Novo redirecionamento"
              href="#"
            />
            <SidebarItem icon={faUser} text="Minha conta" href="#" />
          </div>
          <SidebarItem
            className="px-4 py-3 flex items-center space-x-4 rounded-md text-red-500 group mb-4"
            icon={faSignOutAlt}
            text="Encerrar sessão"
            href="#"
            onClick={handleLogout}
            isLoading={isLoggingOut}
          />
        </div>
      </div>
    </>
  );
};

const Navbar = ({ toggleSidebar }) => (
  <nav className="bg-white border-b border-gray-300 fixed top-0 left-0 w-full z-30">
    <div className="flex justify-between items-center px-9 h-16">
      <button id="menu-button" className="lg:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="text-teal-500 text-lg" />
      </button>
      <div className="space-x-4">
        <button>
          <FontAwesomeIcon icon={faBell} className="text-teal-500 text-lg" />
        </button>
        <button>
          <FontAwesomeIcon icon={faUser} className="text-teal-500 text-lg" />
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

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <main className="flex flex-col lg:ml-64 mt-16 p-6 pb-16 w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
