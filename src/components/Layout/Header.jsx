import React from 'react';
import { FaUserCircle, FaMoon, FaSun, FaBell } from 'react-icons/fa';
import { useApp } from '../../context/AppContext';

const Header = () => {
  const { darkMode, setDarkMode } = useApp();

  return (
    <header className={`px-6 py-4 flex-shrink-0 transition-all duration-300 border-b ${darkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
            Welcome Back!
          </h1>
          <p className={`text-sm mt-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your trust operations efficiently
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <FaBell size={16} />
          </button>
          
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: darkMode ? '#3b82f6' : '#cbd5e1' }}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md flex items-center justify-center ${
                darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            >
              {darkMode ? <FaMoon size={10} className="text-blue-600" /> : <FaSun size={10} className="text-yellow-500" />}
            </div>
          </button>
          
          {/* User Profile */}
          <div className={`flex items-center gap-3 pl-3 border-l ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="text-right">
              <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Admin User</p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Trust Manager</p>
            </div>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-md ${darkMode ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : 'bg-black'}`}>
              <FaUserCircle className="text-white text-lg" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
