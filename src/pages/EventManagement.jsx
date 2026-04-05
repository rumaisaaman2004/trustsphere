import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaCalendar, FaMapMarker } from 'react-icons/fa';
import { useApp } from '../context/AppContext';
import Modal from '../components/UI/Modal';

const EventManagement = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    resetForm();
    setIsModalOpen(false);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      location: event.location,
      description: event.description
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      description: ''
    });
  };

  const isUpcoming = (date) => new Date(date) >= new Date();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create and manage trust events</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <FaPlus size={14} /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`premium-card overflow-hidden ${
              isUpcoming(event.date) ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-gray-500'
            }`}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                </div>
                <div className="flex gap-2 ml-3">
                  <button
                    onClick={() => handleEdit(event)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
              <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaCalendar className="mr-2 text-gray-500 dark:text-gray-500" size={14} />
                  <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FaMapMarker className="mr-2 text-gray-500 dark:text-gray-500" size={14} />
                  <span className="text-sm">{event.location}</span>
                </div>
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
        title={editingEvent ? 'Edit Event' : 'Create New Event'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-premium"
              placeholder="Enter event title"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="input-premium"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
            <textarea
              rows="3"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-premium"
              placeholder="Enter description"
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
              {editingEvent ? 'Update' : 'Create'} Event
            </button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
};

export default EventManagement;
