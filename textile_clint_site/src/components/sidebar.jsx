import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-slate-100 min-h-screen p-4 shadow-inner hidden md:block">
      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">Management</h2>
          <div className="flex flex-col space-y-1">
            <Link to="/home" className="px-3 py-2 rounded hover:bg-slate-700 transition font-medium text-sm">Dashboard Overview</Link>
            <Link to="/orders" className="px-3 py-2 rounded hover:bg-slate-700 transition font-medium text-sm">Order Tracking</Link>
            <Link to="/shipments" className="px-3 py-2 rounded hover:bg-slate-700 transition font-medium text-sm">Shipment Status</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;