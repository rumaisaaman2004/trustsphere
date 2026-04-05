import React from 'react';
import { motion } from 'framer-motion';
import { FaTrashAlt, FaMoon, FaSun, FaInfoCircle, FaDatabase, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Settings = () => {
  const { darkMode, setDarkMode, clearAllData } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const settingsSections = [
    {
      icon: darkMode ? FaMoon : FaSun,
      title: 'Appearance',
      description: 'Customize how TrustSphere looks',
      content: (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Toggle between light and dark theme</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ backgroundColor: darkMode ? '#3b82f6' : '#4b5563' }}
          >
            <div
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 shadow-md flex items-center justify-center ${
                darkMode ? 'translate-x-6' : 'translate-x-0.5'
              }`}
            >
              {darkMode ? <FaMoon size={10} className="text-blue-600" /> : <FaSun size={10} className="text-yellow-500" />}
            </div>
          </button>
        </div>
      )
    },
    {
      icon: FaDatabase,
      title: 'Data Management',
      description: 'Manage your application data',
      content: (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Clear All Data</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete all donations, beneficiaries, and events</p>
          </div>
          <button
            onClick={clearAllData}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            <FaTrashAlt size={14} />
            <span className="text-sm font-medium">Clear All Data</span>
          </button>
        </div>
      )
    },
    {
      icon: FaShieldAlt,
      title: 'Security',
      description: 'Manage your account security',
      content: (
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Logout</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sign out of your account</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            <FaSignOutAlt size={14} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      )
    },
    {
      icon: FaInfoCircle,
      title: 'About',
      description: 'Application information',
      content: (
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">Version: <span className="font-semibold text-gray-900 dark:text-white">2.0.0</span></p>
          <p className="text-sm text-gray-600 dark:text-gray-400">A comprehensive trust organization management system</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Features: Donation tracking, beneficiary management, event coordination</p>
        </div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your preferences and account settings</p>
      </div>

      <div className="grid gap-4">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
                  <section.icon className="text-gray-700 dark:text-gray-300 text-lg" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{section.description}</p>
                  {section.content}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-600">© 2024 TrustSphere. All rights reserved.</p>
      </div>
    </motion.div>
  );
};

export default Settings;
