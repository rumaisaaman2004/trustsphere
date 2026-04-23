import React from 'react';
import { FaUserCircle, FaMoon, FaSun, FaBell, FaBars } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const Header = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const { darkMode, setDarkMode } = useApp();

  return (
    <header className={`px-3 sm:px-4 md:px-6 py-3 md:py-4 flex-shrink-0 transition-all duration-300 border-b ${darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          {(isMobile || !sidebarOpen) && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
            >
              <FaBars className={`text-lg sm:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>
          )}
          <div className="hidden sm:block">
            <h1 className={`text-lg sm:text-xl md:text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back!
            </h1>
            <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-0.5 hidden md:block`}>
              Manage your trust operations efficiently
            </p>
          </div>
          {/* Mobile welcome text */}
          <div className="block sm:hidden">
            <h1 className={`text-base font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome!
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <FaBell size={14} className="sm:text-base" />
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-10 h-5 sm:w-12 sm:h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: darkMode ? '#3b82f6' : '#cbd5e1' }}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white transition-all duration-300 shadow-md flex items-center justify-center ${
                darkMode ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
              }`}
            >
              {darkMode ? <FaMoon size={8} className="sm:text-[10px] text-blue-600" /> : <FaSun size={8} className="sm:text-[10px] text-yellow-500" />}
            </div>
          </button>
          
          {/* User Profile */}
          <div className={`flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="text-right hidden xs:block">
              <p className={`text-xs sm:text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Admin User</p>
              <p className={`text-[10px] sm:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Trust Manager</p>
            </div>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md">
              <FaUserCircle className="text-white text-base sm:text-lg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
