import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AppContext = createContext();

const initialDonations = [
  {
    id: '1',
    amount: 5000,
    donorName: 'Rumaisa Aman',
    purpose: 'Education Fund',
    date: '2024-01-15'
  },
  {
    id: '2',
    amount: 3000,
    donorName: 'Sameeha Aman',
    purpose: 'Medical Aid',
    date: '2024-01-20'
  }
];

const initialBeneficiaries = [
  {
    id: '1',
    name: 'Ahmed Khan',
    category: 'Orphan',
    supportType: 'Education',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Fatima Ali',
    category: 'Disabled',
    supportType: 'Medical',
    status: 'Active'
  }
];

const initialEvents = [
  {
    id: '1',
    title: 'Food Distribution',
    date: '2024-02-01',
    location: 'Community Center',
    description: 'Monthly food distribution event'
  },
  {
    id: '2',
    title: 'Health Camp',
    date: '2024-02-10',
    location: 'City Hospital',
    description: 'Free medical checkup camp'
  }
];

export const AppProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    const storedDonations = localStorage.getItem('trustsphere_donations');
    const storedBeneficiaries = localStorage.getItem('trustsphere_beneficiaries');
    const storedEvents = localStorage.getItem('trustsphere_events');
    const storedDarkMode = localStorage.getItem('trustsphere_darkmode');

    setDonations(storedDonations ? JSON.parse(storedDonations) : initialDonations);
    setBeneficiaries(storedBeneficiaries ? JSON.parse(storedBeneficiaries) : initialBeneficiaries);
    setEvents(storedEvents ? JSON.parse(storedEvents) : initialEvents);
    
    if (storedDarkMode !== null) {
      setDarkMode(JSON.parse(storedDarkMode));
    }
    
    setLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('trustsphere_donations', JSON.stringify(donations));
      localStorage.setItem('trustsphere_beneficiaries', JSON.stringify(beneficiaries));
      localStorage.setItem('trustsphere_events', JSON.stringify(events));
    }
  }, [donations, beneficiaries, events, loading]);

  // Theme management - Add/remove dark class from html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('trustsphere_darkmode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Donation CRUD
  const addDonation = (donation) => {
    const newDonation = { ...donation, id: Date.now().toString() };
    setDonations([...donations, newDonation]);
    toast.success('Donation added successfully!');
  };

  const updateDonation = (id, updatedDonation) => {
    setDonations(donations.map(d => d.id === id ? { ...updatedDonation, id } : d));
    toast.success('Donation updated successfully!');
  };

  const deleteDonation = (id) => {
    setDonations(donations.filter(d => d.id !== id));
    toast.success('Donation deleted successfully!');
  };

  // Beneficiary CRUD
  const addBeneficiary = (beneficiary) => {
    const newBeneficiary = { ...beneficiary, id: Date.now().toString(), status: 'Active' };
    setBeneficiaries([...beneficiaries, newBeneficiary]);
    toast.success('Beneficiary added successfully!');
  };

  const updateBeneficiary = (id, updatedBeneficiary) => {
    setBeneficiaries(beneficiaries.map(b => b.id === id ? { ...updatedBeneficiary, id } : b));
    toast.success('Beneficiary updated successfully!');
  };

  const deleteBeneficiary = (id) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== id));
    toast.success('Beneficiary deleted successfully!');
  };

  // Event CRUD
  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
    toast.success('Event created successfully!');
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(events.map(e => e.id === id ? { ...updatedEvent, id } : e));
    toast.success('Event updated successfully!');
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    toast.success('Event deleted successfully!');
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      setDonations([]);
      setBeneficiaries([]);
      setEvents([]);
      toast.success('All data cleared successfully!');
    }
  };

  return (
    <AppContext.Provider value={{
      donations,
      beneficiaries,
      events,
      darkMode,
      setDarkMode,
      addDonation,
      updateDonation,
      deleteDonation,
      addBeneficiary,
      updateBeneficiary,
      deleteBeneficiary,
      addEvent,
      updateEvent,
      deleteEvent,
      clearAllData,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
