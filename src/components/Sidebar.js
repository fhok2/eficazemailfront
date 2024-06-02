import React, { useState } from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-custom-bg -mb-20 text-white h-screen w-64 flex flex-col fixed md:relative z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 `}>
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <div className="text-xl font-semibold">Dashboard</div>
      </div>
      <div className="flex-grow">
        <nav className="flex flex-col mt-4 space-y-2">
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="material-icons">home</span>
            <span className="ml-4">Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="material-icons">group</span>
            <span className="ml-4">Team</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="material-icons">folder</span>
            <span className="ml-4">Projects</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="material-icons">calendar_today</span>
            <span className="ml-4">Calendar</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="material-icons">description</span>
            <span className="ml-4">Documents</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="material-icons">bar_chart</span>
            <span className="ml-4">Reports</span>
          </a>
        </nav>
      </div>
      <div className="border-t border-gray-700">
        <div className="px-4 py-2 text-gray-400">Your teams</div>
        <nav className="flex flex-col space-y-2">
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="bg-gray-600 rounded-full h-8 w-8 flex items-center justify-center text-sm">H</span>
            <span className="ml-4">Heroicons</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="bg-gray-600 rounded-full h-8 w-8 flex items-center justify-center text-sm">T</span>
            <span className="ml-4">Tailwind Labs</span>
          </a>
          <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
            <span className="bg-gray-600 rounded-full h-8 w-8 flex items-center justify-center text-sm">W</span>
            <span className="ml-4">Workcation</span>
          </a>
        </nav>
      </div>
      <div className="border-t border-gray-700">
        <a href="#" className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white">
          <span className="material-icons">settings</span>
          <span className="ml-4">Settings</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
