import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  // Grab the real user's name if it exists in local storage from your login page
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Operator' };

  return (
    <div className="max-w-7xl mx-auto w-full">
      
      {/* Welcome Title Banner */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Welcome Back, {user.name}
        </h1>
        <p className="text-slate-500 mt-1">Here is your operational snapshot for today.</p>
      </div>

      {/* Navigation Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Card 1: Order Dispatcher */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            📦
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Order Dispatcher</h3>
          <p className="text-sm text-slate-500 mb-4">
            Process internal fulfillment strings and coordinate pipeline adjustments.
          </p>
          <Link to="/orders" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
            Initialize Order &rarr;
          </Link>
        </div>

        {/* Card 2: Freight Terminal */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200">
          <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold mb-4">
            🚢
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Freight Terminal</h3>
          <p className="text-sm text-slate-500 mb-4">
            Monitor outbound tracking manifests and clear active customs barriers.
          </p>
          <Link to="/shipments" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
            Trace Active Routes &rarr;
          </Link>
        </div>

        {/* Card 3: System Auditing */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200">
          <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 font-bold mb-4">
            📊
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">System Auditing</h3>
          <p className="text-sm text-slate-500 mb-4">
            Extract structured metrics arrays and compile quarterly inventory balances.
          </p>
          <Link to="/orders" className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition">
            Generate Reports &rarr;
          </Link>
        </div>

      </div>

      {/* System Notice Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-sm">
        <div className="max-w-xl">
          <span className="bg-indigo-600 text-xs uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md">
            System Notice
          </span>
          <h2 className="text-xl font-bold mt-3 mb-2">Multi-Warehouse Token Integration Active</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Your account session is successfully bound to the secure corporate proxy layer. 
            Database records reflect structural deployments matching current inventory thresholds.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Home;