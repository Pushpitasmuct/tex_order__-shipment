import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Helper function to dynamically check and apply active styling to menu links
  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-slate-700 text-indigo-400 font-medium' 
      : 'text-gray-300 hover:bg-slate-800 hover:text-white';
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-850">
      {/* Sidebar Section Title */}
      <div className="px-6 py-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Management
        </p>
      </div>

      {/* Navigation Layout */}
      <nav className="flex-1 px-3 space-y-1">
        <Link
          to="/"
          className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-colors duration-200 ${isActive('/') || isActive('/home')}`}
        >
          Dashboard Overview
        </Link>

        <Link
          to="/orders"
          className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-colors duration-200 ${isActive('/orders')}`}
        >
          Order Tracking
        </Link>

        <Link
          to="/shipments"
          className={`flex items-center px-3 py-2.5 rounded-md text-sm transition-colors duration-200 ${isActive('/shipments')}`}
        >
          Shipment Status
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;