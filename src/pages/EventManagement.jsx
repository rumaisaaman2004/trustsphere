import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaCalendar, FaMapMarker } from 'react-icons/fa';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import toast from 'react-hot-toast';
import Modal from '../components/UI/Modal';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    location: '',
    description: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      console.log('Loaded events:', data);
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        const updated = await updateEvent(editingEvent.id, formData);
        setEvents(events.map(e => e.id === editingEvent.id ? updated : e));
        toast.success('Event updated!');
      } else {
        const newEvent = await createEvent(formData);
        setEvents([newEvent, ...events]);
        toast.success('Event created!');
      }
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Operation failed');
    }
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

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents(events.filter(e => e.id !== id));
        toast.success('Event deleted!');
      } catch (error) {
        toast.error('Delete failed');
      }
    }
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event Management</h1>
          <p className="text-sm text-gray-500">Total: {events.length} events</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus size={14} /> Add Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-10 text-center border">
          <p className="text-gray-500">No events yet. Click "Add Event" to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(event)} className="text-blue-600">✏️</button>
                  <button onClick={() => handleDelete(event.id)} className="text-red-600">🗑️</button>
                </div>
              </div>
              <div className="mt-3 pt-2 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendar size={12} /> {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <FaMapMarker size={12} /> {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); resetForm(); }} title={editingEvent ? 'Edit Event' : 'New Event'}>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Title" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-800" />
          <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-800" />
          <input type="text" placeholder="Location" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-800" />
          <textarea placeholder="Description" required rows="2" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-800" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black rounded">{editingEvent ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EventManagement;
