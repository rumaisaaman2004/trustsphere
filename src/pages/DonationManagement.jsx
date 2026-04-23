import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

const DonationManagement = () => {
  const { donations, addDonation, updateDonation, deleteDonation, darkMode } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donationData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    if (editingDonation) {
      await updateDonation(editingDonation.id, donationData);
    } else {
      await addDonation(donationData);
    }
    
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (donation) => {
    setEditingDonation(donation);
    setFormData({
      amount: donation.amount.toString(),
      donorName: donation.donorName,
      purpose: donation.purpose,
      date: donation.date
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingDonation(null);
    setFormData({
      amount: '',
      donorName: '',
      purpose: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Donation Management</h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage all donations</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2 text-sm md:text-base"
        >
          <FaPlus size={14} /> Add Donation
        </button>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium uppercase tracking-wider">Donor Name</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium uppercase tracking-wider">Purpose</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-3 md:px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No donations yet
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-3 md:px-6 py-2 md:py-4 text-sm font-medium text-gray-900 dark:text-white">{donation.donorName}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-emerald-600 dark:text-emerald-400 font-semibold">${parseFloat(donation.amount).toLocaleString()}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-600 dark:text-gray-400">{donation.purpose}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-sm text-gray-500">{donation.date}</td>
                    <td className="px-3 md:px-6 py-2 md:py-4 text-sm">
                      <button
                        onClick={() => handleEdit(donation)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 mr-2 md:mr-3"
                      >
                        <FaEdit size={14} className="md:text-base" />
                      </button>
                      <button
                        onClick={() => deleteDonation(donation.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800"
                      >
                        <FaTrash size={14} className="md:text-base" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingDonation ? 'Edit Donation' : 'Add New Donation'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Donor Name *</label>
            <input
              type="text"
              required
              value={formData.donorName}
              onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
              className="input-premium"
              placeholder="Enter donor name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Amount ($) *</label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="input-premium"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Purpose *</label>
            <input
              type="text"
              required
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="input-premium"
              placeholder="Enter purpose"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date *</label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-premium"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                resetForm();
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingDonation ? 'Update' : 'Add'} Donation
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default DonationManagement;
