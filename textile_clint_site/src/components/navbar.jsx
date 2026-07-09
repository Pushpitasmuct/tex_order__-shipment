import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6">
        <span className="font-bold text-xl tracking-wider text-indigo-400">TEXTILE LOGISTICS</span>
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          <Link to="/home" className="hover:text-indigo-300 transition">Home</Link>
          <Link to="/orders" className="hover:text-indigo-300 transition">Orders</Link>
          <Link to="/shipments" className="hover:text-indigo-300 transition">Shipments</Link>
        </div>
      </div>
      
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