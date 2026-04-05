import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaUserCircle } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

const BeneficiaryManagement = () => {
  const { beneficiaries, addBeneficiary, updateBeneficiary, deleteBeneficiary } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBeneficiary, setEditingBeneficiary] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Orphan',
    supportType: 'Education'
  });

  const categories = ['Orphan', 'Disabled', 'Elderly', 'Low Income', 'Refugee'];
  const supportTypes = ['Education', 'Medical', 'Food', 'Shelter', 'Financial'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBeneficiary) {
      updateBeneficiary(editingBeneficiary.id, formData);
    } else {
      addBeneficiary(formData);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (beneficiary) => {
    setEditingBeneficiary(beneficiary);
    setFormData({
      name: beneficiary.name,
      category: beneficiary.category,
      supportType: beneficiary.supportType
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingBeneficiary(null);
    setFormData({
      name: '',
      category: 'Orphan',
      supportType: 'Education'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Orphan: 'bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400',
      Disabled: 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400',
      Elderly: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400',
      'Low Income': 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400',
      Refugee: 'bg-rose-100 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Beneficiary Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track all beneficiaries</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus size={14} /> Add Beneficiary
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {beneficiaries.map((beneficiary, index) => (
          <motion.div
            key={beneficiary.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="premium-card p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <FaUserCircle className="text-gray-600 dark:text-gray-400 text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{beneficiary.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-500">ID: {beneficiary.id.slice(-6)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(beneficiary)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteBeneficiary(beneficiary.id)}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Category</span>
                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(beneficiary.category)}`}>
                  {beneficiary.category}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Support Type</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{beneficiary.supportType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-lg text-xs font-medium">
                  {beneficiary.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          resetForm();
        }}
        title={editingBeneficiary ? 'Edit Beneficiary' : 'Add New Beneficiary'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-premium"
              placeholder="Enter beneficiary name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-premium"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Support Type *</label>
            <select
              value={formData.supportType}
              onChange={(e) => setFormData({ ...formData, supportType: e.target.value })}
              className="input-premium"
            >
              {supportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
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
              {editingBeneficiary ? 'Update' : 'Add'} Beneficiary
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default BeneficiaryManagement;
