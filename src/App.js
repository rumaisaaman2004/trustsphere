import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import DonationManagement from './pages/DonationManagement';
import BeneficiaryManagement from './pages/BeneficiaryManagement';
import EventManagement from './pages/EventManagement';
import SearchFilter from './pages/SearchFilter';
import Settings from './pages/Settings';

// Protected Route Component - Redirects to auth if not logged in
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

// Public Route - Redirects to dashboard if already logged in
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return !isAuthenticated ? children : <Navigate to="/app" />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Landing Page - Opens first when app runs */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Page - Login/Signup (only accessible when not logged in) */}
          <Route path="/auth" element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          } />
          
          {/* Protected Dashboard Routes - Only accessible after login */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="donations" element={<DonationManagement />} />
            <Route path="beneficiaries" element={<BeneficiaryManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="search" element={<SearchFilter />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch all - redirect to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
