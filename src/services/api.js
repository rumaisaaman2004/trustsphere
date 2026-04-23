const API_URL = 'http://localhost:8080/api';

// Helper to get token
const getToken = () => localStorage.getItem('token');

// Helper for authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['x-auth-token'] = token;
  }
  
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });
  
  return response.json();
};

// ============ USER AUTH ============
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('isAuthenticated', 'true');
  }
  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    localStorage.setItem('isAuthenticated', 'true');
  }
  return data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isAuthenticated');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserProfile = async () => {
  return authFetch('/users/profile');
};

// ============ DONATIONS CRUD ============
export const getDonations = async () => {
  return authFetch('/donations');
};

export const getDonationById = async (id) => {
  return authFetch(`/donations/${id}`);
};

export const createDonation = async (donationData) => {
  return authFetch('/donations', {
    method: 'POST',
    body: JSON.stringify(donationData),
  });
};

export const updateDonation = async (id, donationData) => {
  return authFetch(`/donations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(donationData),
  });
};

export const deleteDonation = async (id) => {
  return authFetch(`/donations/${id}`, {
    method: 'DELETE',
  });
};

// ============ BENEFICIARIES CRUD ============
export const getBeneficiaries = async () => {
  return authFetch('/beneficiaries');
};

export const getBeneficiaryById = async (id) => {
  return authFetch(`/beneficiaries/${id}`);
};

export const createBeneficiary = async (beneficiaryData) => {
  return authFetch('/beneficiaries', {
    method: 'POST',
    body: JSON.stringify(beneficiaryData),
  });
};

export const updateBeneficiary = async (id, beneficiaryData) => {
  return authFetch(`/beneficiaries/${id}`, {
    method: 'PUT',
    body: JSON.stringify(beneficiaryData),
  });
};

export const deleteBeneficiary = async (id) => {
  return authFetch(`/beneficiaries/${id}`, {
    method: 'DELETE',
  });
};

// ============ EVENTS CRUD ============
export const getEvents = async () => {
  return authFetch('/events');
};

export const getEventById = async (id) => {
  return authFetch(`/events/${id}`);
};

export const createEvent = async (eventData) => {
  return authFetch('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
};

export const updateEvent = async (id, eventData) => {
  return authFetch(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  });
};

export const deleteEvent = async (id) => {
  return authFetch(`/events/${id}`, {
    method: 'DELETE',
  });
};
