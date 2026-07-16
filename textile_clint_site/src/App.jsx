import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Home from './Home/Home.jsx';
import Orders from './Orders/Orders.jsx';
import Shipments from './Shipments/Shipments.jsx';

// Core UI shell components
import Navbar from './components/navbar.jsx';
import Sidebar from './components/sidebar.jsx';

// 1. Layout Component: Renders the Navbar and Sidebar exclusively on dashboard panels
const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Application Header */}
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Drawer */}
        <Sidebar />
        
        {/* Core Main View Frame */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* A) Public/Auth Views (Isolated frames without navbar or sidebar layout blocks) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* B) Secure Administration Paneling (Wrapped dynamically into the UI frame) */}
        <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/home" element={<DashboardLayout><Home /></DashboardLayout>} />
        <Route path="/orders" element={<DashboardLayout><Orders /></DashboardLayout>} />
        <Route path="/shipments" element={<DashboardLayout><Shipments /></DashboardLayout>} />

        {/* Wildcard Fallback redirection router for mismatched paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;