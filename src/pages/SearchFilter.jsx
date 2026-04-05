import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { useApp } from '../context/AppContext';

const SearchFilter = () => {
  const { donations, beneficiaries, events } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('');

  const getFilteredResults = () => {
    let results = [];

    if (filterType === 'all' || filterType === 'donations') {
      const filteredDonations = donations.filter(d => 
        d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.purpose.toLowerCase().includes(searchTerm.toLowerCase())
      );
      results.push(...filteredDonations.map(d => ({ ...d, type: 'donation' })));
    }

    if (filterType === 'all' || filterType === 'beneficiaries') {
      const filteredBeneficiaries = beneficiaries.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      results.push(...filteredBeneficiaries.map(b => ({ ...b, type: 'beneficiary' })));
    }

    if (filterType === 'all' || filterType === 'events') {
      const filteredEvents = events.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      results.push(...filteredEvents.map(e => ({ ...e, type: 'event' })));
    }

    if (filterCategory) {
      results = results.filter(r => 
        r.category === filterCategory || 
        r.supportType === filterCategory ||
        r.purpose === filterCategory
      );
    }

    return results;
  };

  const results = getFilteredResults();

  const getTypeColor = (type) => {
    const colors = {
      donation: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
      beneficiary: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
      event: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search & Filter</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Search across donations, beneficiaries, and events</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="premium-card p-5">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, title, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-premium pl-10"
              />
            </div>
          </div>
          
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input-premium"
            >
              <option value="all">All Types</option>
              <option value="donations">Donations</option>
              <option value="beneficiaries">Beneficiaries</option>
              <option value="events">Events</option>
            </select>
          </div>
          
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-premium"
            >
              <option value="">All Categories</option>
              <option value="Education">Education</option>
              <option value="Medical">Medical</option>
              <option value="Food">Food</option>
              <option value="Orphan">Orphan</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Results ({results.length})
          </h2>
        </div>
        
        <div className="grid gap-4">
          {results.map((result, index) => (
            <motion.div
              key={`${result.type}-${result.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="premium-card p-5"
            >
              <div className="flex items-start gap-4">
                <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${getTypeColor(result.type)}`}>
                  {result.type.toUpperCase()}
                </div>
                <div className="flex-1">
                  {result.type === 'donation' && (
                    <>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{result.donorName}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Amount: <span className="font-semibold text-emerald-600 dark:text-emerald-400">${result.amount.toLocaleString()}</span></p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Purpose: {result.purpose}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Date: {result.date}</p>
                      </div>
                    </>
                  )}
                  
                  {result.type === 'beneficiary' && (
                    <>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{result.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Category: {result.category}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Support: {result.supportType}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Status: {result.status}</p>
                      </div>
                    </>
                  )}
                  
                  {result.type === 'event' && (
                    <>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">{result.title}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Location: {result.location}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Date: {result.date}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 col-span-2">Description: {result.description}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {results.length === 0 && (
            <div className="premium-card p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No results found</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SearchFilter;
