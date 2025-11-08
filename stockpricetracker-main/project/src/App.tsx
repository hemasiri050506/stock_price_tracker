import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StockProvider } from './contexts/StockContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Watchlist from './pages/Watchlist';
import StockDetail from './pages/StockDetail';
import Auth from './pages/Auth';
import Landing from './pages/Landing';

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/watchlist" 
          element={user ? <Watchlist /> : <Navigate to="/auth" />} 
        />
        <Route 
          path="/stock/:symbol" 
          element={user ? <StockDetail /> : <Navigate to="/auth" />} 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <StockProvider>
          <AppContent />
        </StockProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;