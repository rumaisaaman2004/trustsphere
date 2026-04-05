import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DonationChart = ({ donations }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
  const monthlyData = donations.reduce((acc, donation) => {
    const month = new Date(donation.date).toLocaleString('default', { month: 'short' });
    if (!acc[month]) {
      acc[month] = { month, amount: 0 };
    }
    acc[month].amount += donation.amount;
    return acc;
  }, {});

  const data = Object.values(monthlyData);

  const chartColors = {
    bar: isDarkMode ? '#60a5fa' : '#3b82f6',
    grid: isDarkMode ? '#334155' : '#e2e8f0',
    text: isDarkMode ? '#94a3b8' : '#64748b'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Amount: ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
        <XAxis 
          dataKey="month" 
          stroke={chartColors.text}
          tick={{ fill: chartColors.text }}
        />
        <YAxis 
          stroke={chartColors.text}
          tick={{ fill: chartColors.text }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          wrapperStyle={{ color: chartColors.text }}
        />
        <Bar 
          dataKey="amount" 
          fill={chartColors.bar}
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DonationChart;
