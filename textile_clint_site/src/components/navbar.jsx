import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Clear local application data and push user back to authentication wall
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Helper function to dynamically add active color highlight to the header links
  const isActive = (path) => {
    return location.pathname === path
      ? 'text-indigo-400 font-semibold'
      : 'text-gray-300 hover:text-indigo-300';
  };

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
        {/* Main Application Branding Logo */}
        <span className="font-bold text-xl tracking-wider text-indigo-400">TEXTILE LOGISTICS</span>
        
        {/* Desktop View Navigation Links */}
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors duration-200 ${isActive('/') || isActive('/home')}`}
          >
            Home
          </Link>
          <Link 
            to="/orders" 
            className={`transition-colors duration-200 ${isActive('/orders')}`}
          >
            Orders
          </Link>
          <Link 
            to="/shipments" 
            className={`transition-colors duration-200 ${isActive('/shipments')}`}
          >
            Shipments
          </Link>
        </div>
      </div>
      
      {/* Session Controls and Security Panel */}
      <div className="flex items-center space-x-4">
        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
          Active Session
        </span>
        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-sm font-medium transition shadow-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;