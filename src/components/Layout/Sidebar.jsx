import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaDonate, 
  FaUsers, 
  FaCalendarAlt, 
  FaSearch, 
  FaCog,
  FaHandHoldingHeart,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { darkMode } = useApp();
  
  const menuItems = [
    { path: '/app', name: 'Dashboard', icon: FaTachometerAlt },
    { path: '/app/donations', name: 'Donations', icon: FaDonate },
    { path: '/app/beneficiaries', name: 'Beneficiaries', icon: FaUsers },
    { path: '/app/events', name: 'Events', icon: FaCalendarAlt },
    { path: '/app/search', name: 'Search', icon: FaSearch },
    { path: '/app/settings', name: 'Settings', icon: FaCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    toast.success('Logged out successfully!');
    navigate('/');
  };

  return (
    <aside 
      className={`h-full transition-all duration-300 flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${
        darkMode 
          ? 'bg-gray-950 border-r border-gray-800' 
          : 'bg-white border-r border-gray-200'
      }`}
    >
      {/* Logo Section */}
      <div className={`flex items-center ${sidebarOpen ? 'justify-between px-5' : 'justify-center'} h-16 flex-shrink-0 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        {sidebarOpen ? (
          <>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${darkMode ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : 'bg-black'}`}>
                <FaHandHoldingHeart className="text-white text-sm" />
              </div>
              <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>TrustSphere</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-black'}`}
            >
              <FaChevronLeft size={14} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${darkMode ? 'bg-gradient-to-br from-blue-500 to-indigo-500' : 'bg-black'}`}>
              <FaHandHoldingHeart className="text-white text-sm" />
            </div>
          </button>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive 
                  ? darkMode 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'bg-gray-100 text-black'
                  : darkMode
                    ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
              } ${!sidebarOpen && 'justify-center'}`
            }
            title={!sidebarOpen ? item.name : ''}
          >
            <item.icon size={18} />
            {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button */}
      <div className={`flex-shrink-0 border-t p-3 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 w-full ${
            sidebarOpen ? 'justify-start' : 'justify-center'
          } ${darkMode ? 'text-red-400 hover:bg-red-950/30 hover:text-red-300' : 'text-red-600 hover:bg-red-50 hover:text-red-700'}`}
          title={!sidebarOpen ? 'Logout' : ''}
        >
          <FaSignOutAlt size={18} />
          {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
