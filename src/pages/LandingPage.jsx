import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHandHoldingHeart, FaChartLine, FaUsers, FaCalendarCheck, FaSignInAlt } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const LandingPage = () => {
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950' : 'bg-white'}`}>
      {/* Navigation */}
      <nav className={`container mx-auto px-6 py-4 flex justify-between items-center border-b transition-colors duration-300 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center space-x-2">
          <FaHandHoldingHeart className={`text-3xl ${darkMode ? 'text-blue-400' : 'text-black'}`} />
          <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>TrustSphere</span>
        </div>
        <Link
          to="/auth"
          className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md"
        >
          <FaSignInAlt /> Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
            Empowering Trust
            <span className={darkMode ? 'text-blue-400' : 'text-black'}> Organizations</span>
          </h1>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Streamline your donation management, beneficiary tracking, and event coordination with our comprehensive management system.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-lg shadow-md"
          >
            Get Started Free
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: FaChartLine, title: 'Donation Tracking', desc: 'Track and manage donations in real-time' },
            { icon: FaUsers, title: 'Beneficiary Management', desc: 'Efficiently manage beneficiary records' },
            { icon: FaCalendarCheck, title: 'Event Coordination', desc: 'Plan and execute events seamlessly' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}
            >
              <feature.icon className={`text-4xl mx-auto mb-4 ${darkMode ? 'text-blue-400' : 'text-black'}`} />
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{feature.title}</h3>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
