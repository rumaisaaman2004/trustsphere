import React from 'react';
import { motion } from 'framer-motion';
import { FaDonate, FaUsers, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import DonationChart from '../components/Charts/DonationChart';

const Dashboard = () => {
  const { donations, beneficiaries, events } = useApp();
  
  const totalDonations = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const activeBeneficiaries = beneficiaries.filter(b => b.status === 'Active').length;
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalDonations.toLocaleString()}`,
      icon: FaDollarSign,
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Donations',
      value: donations.length,
      icon: FaDonate,
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Beneficiaries',
      value: activeBeneficiaries,
      icon: FaUsers,
      change: '+5.3%',
      trend: 'up'
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents,
      icon: FaCalendarAlt,
      change: '-2.1%',
      trend: 'down'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Stats Grid - Responsive: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <div className="p-2 md:p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                <stat.icon className={`text-lg md:text-xl ${
                  stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === 'up' 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Donations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        <div className="premium-card p-4 md:p-5">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Donation Trends</h3>
          <DonationChart donations={donations} />
        </div>
        
        <div className="premium-card p-4 md:p-5">
          <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Recent Donations</h3>
          <div className="space-y-2">
            {donations.slice(0, 5).map((donation) => (
              <div key={donation.id} className="flex justify-between items-center p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm md:text-base text-gray-900 dark:text-white truncate">{donation.donorName}</p>
                  <p className="text-xs text-gray-500 truncate">{donation.purpose}</p>
                </div>
                <div className="text-right ml-2">
                  <p className="font-bold text-sm md:text-base text-emerald-600 dark:text-emerald-400">${parseFloat(donation.amount).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{donation.date}</p>
                </div>
              </div>
            ))}
            {donations.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No donations yet
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
