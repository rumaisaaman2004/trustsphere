import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useApp } from '../../context/AppContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { darkMode } = useApp();

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="flex h-full">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
          <Header />
          
          <main className={`flex-1 overflow-y-auto transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div className="container mx-auto px-6 py-6 max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
