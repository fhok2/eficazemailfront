import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, Home, RefreshCcw, LogOut, Menu, X, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreateRedirect from "../CreateRedirect";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuthContext } from "@/contexts/AuthContext";
import LogoutButton from './NewLogoutButton';
import UserInfoModal from "../modal/UserInfoModal";
import FeedbackModal from "../modal/FeedbackModal";

// Custom CrownUser icon for pro users
const CrownUser = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 7v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7" />
    <path d="M12 21a2 2 0 0 1-2-2v-4h4v4a2 2 0 0 1-2 2z" />
    <path d="M12 3a2 2 0 0 0-2 2v4h4V5a2 2 0 0 0-2-2z" />
    <path d="m5 3 2 2-2 2" />
    <path d="m19 3-2 2 2 2" />
    <path d="M12 15h.01" />
  </svg>
);

const SidebarItem = ({ icon: Icon, text, href, className, onClick, isLoading, isActive, isCollapsed }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          className={`px-4 py-3 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'} rounded-md text-gray-300 transition-colors duration-300 ${
            isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
          } ${className || ''}`}
          onClick={onClick}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-brand-light"></div>
          ) : (
            <Icon className="h-5 w-5 flex-shrink-0" />
          )}
          {!isCollapsed && <span>{text}</span>}
        </a>
      </TooltipTrigger>
      {isCollapsed && (
        <TooltipContent side="right">
          <p>{text}</p>
        </TooltipContent>
      )}
    </Tooltip>
  </TooltipProvider>
);

const Sidebar = ({ sidebarOpen, closeSidebar, currentPage, setCurrentPage, openCreateRedirect, isCollapsed }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { handleLogout } = useAuthContext();

  const handleLogoutUser = async (e) => {
    e.preventDefault();
    setIsLoggingOut(true);
    try {
      const result = await handleLogout();
      if (result.error) {
        console.error(result.message);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleNavigation = (page) => (e) => {
    e.preventDefault();
    setCurrentPage(page);
    closeSidebar();
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
        className={`bg-gray-800 h-full fixed top-0 left-0 z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        <div className="p-6 flex mt-10 flex-col justify-between h-full">
          <div className="space-y-2">
            <button
              onClick={closeSidebar}
              className="lg:hidden absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X className="h-6 w-6  " />
            </button>
            <div className="flex flex-col mt-10 space-y-6">
              <SidebarItem
                icon={Home}
                text="Inicio"
                href="#"
                onClick={handleNavigation('dashboard')}
                isActive={currentPage === 'dashboard'}
                isCollapsed={isCollapsed}
              />
              <SidebarItem
                icon={RefreshCcw}
                text="Novo redirecionamento"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  openCreateRedirect();
                  closeSidebar();
                }}
                isCollapsed={isCollapsed}
              />
              {/* <SidebarItem
                icon={User}
                text="Minha conta"
                href="#"
                onClick={handleNavigation('account')}
                isActive={currentPage === 'account'}
                isCollapsed={isCollapsed}
              /> */}
            </div>
          </div >
          <div className="mb-10">
            <LogoutButton
              onClick={handleLogoutUser}
              isLoading={isLoggingOut}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>
    </>
  );
};





const Navbar = ({ toggleSidebar, isCollapsed, toggleCollapse, openUserInfo, userInfo, openFeedbackModal }) => (
  <nav className="bg-gray-800 border-b border-gray-700 fixed top-0 left-0 w-full z-30">
    <div className="flex justify-between items-center px-4 lg:px-9 h-16">
      <div className="flex items-center">
        <button className="lg:hidden text-gray-300 hover:text-white mr-4" onClick={toggleSidebar}>
          <Menu className="h-6 w-6" />
        </button>
        <button className="hidden lg:block text-gray-300 hover:text-white" onClick={toggleCollapse}>
          {isCollapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
        </button>
      </div>
      <div className="space-x-8 flex items-center mr-9">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-300 hover:text-white" onClick={openFeedbackModal}>
                <MessageSquare className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Feedback</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <button className="text-gray-300 hover:text-white">
          <Bell className="h-6 w-6" />
        </button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-300 hover:text-white relative" onClick={openUserInfo}>
                {userInfo && userInfo.plan === "pro" ? (
                  <CrownUser className="h-6 w-6 text-yellow-400" />
                ) : (
                  <User className="h-6 w-6" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{userInfo ? (userInfo.plan === "pro" ? "Pro Plan" : "Free Plan") : "Loading..."}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  </nav>
);

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCreateRedirectOpen, setIsCreateRedirectOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    // Fetch user info from localStorage
    const storedUserInfo = {
      email: localStorage.getItem('email') || '',
      emailVerified: JSON.parse(localStorage.getItem('emailVerified') || 'false'),
      name: localStorage.getItem('name') || '',
      paymentDate: localStorage.getItem('paymentDate') || '',
      permissions: JSON.parse(localStorage.getItem('permissions') || '[]'),
      plan: localStorage.getItem('plan') || 'free',
      role: localStorage.getItem('role') || '',
      userId: localStorage.getItem('userId') || '',
    };
    setUserInfo(storedUserInfo);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const openCreateRedirect = () => {
    setIsCreateRedirectOpen(true);
  };

  const openUserInfo = () => {
    setIsUserInfoModalOpen(true);
  };

  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {  // lg breakpoint
        setSidebarOpen(true);
        setIsCollapsed(window.innerWidth < 1280);  // Collapse for lg, expand for xl
      } else {
        setSidebarOpen(false);
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderCreateRedirect = () => {
    if (typeof window === "undefined") return null; // Check for SSR
    return createPortal(
      <CreateRedirect 
        isOpen={isCreateRedirectOpen} 
        onClose={() => setIsCreateRedirectOpen(false)} 
      />,
      document.body
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isCollapsed={isCollapsed} 
        toggleCollapse={toggleCollapse} 
        openUserInfo={openUserInfo}
        userInfo={userInfo}
        openFeedbackModal={openFeedbackModal}
      />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar 
          sidebarOpen={sidebarOpen} 
          closeSidebar={closeSidebar} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          openCreateRedirect={openCreateRedirect}
          isCollapsed={isCollapsed}
        />
        <main className={`flex-1 p-6 overflow-x-hidden overflow-y-auto transition-all duration-300
          ${sidebarOpen ? (isCollapsed ? 'lg:ml-16' : 'lg:ml-64') : 'lg:ml-0'}`}>
          <div className="max-w-full">
            {children(currentPage)}
          </div>
        </main>
      </div>
      {renderCreateRedirect()}
      {userInfo && (
        <UserInfoModal
          isOpen={isUserInfoModalOpen}
          onClose={() => setIsUserInfoModalOpen(false)}
        />
      )}
      <FeedbackModal 
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </div>
  );
};

export default Layout;