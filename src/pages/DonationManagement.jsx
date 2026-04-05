import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

const DonationManagement = () => {
  const { donations, addDonation, updateDonation, deleteDonation } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    purpose: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const donationData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    if (editingDonation) {
      updateDonation(editingDonation.id, donationData);
    } else {
      addDonation(donationData);
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
      className="space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Donation Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage all donations</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus size={14} /> Add Donation
        </button>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="premium-table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No donations yet. Click "Add Donation" to get started.
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id}>
                    <td className="font-medium text-gray-900 dark:text-white">{donation.donorName}</td>
                    <td className="text-emerald-600 dark:text-emerald-400 font-semibold">${donation.amount.toLocaleString()}</td>
                    <td className="text-gray-600 dark:text-gray-400">{donation.purpose}</td>
                    <td className="text-gray-500 dark:text-gray-500">{donation.date}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(donation)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3 transition-colors"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => deleteDonation(donation.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                      >
                        <FaTrash size={16} />
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Donor Name *</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount ($) *</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purpose *</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date *</label>
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
              className="btn-premium"
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
