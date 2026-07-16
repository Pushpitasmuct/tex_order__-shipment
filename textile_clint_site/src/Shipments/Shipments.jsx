import React, { useState, useEffect } from 'react';

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  // Fetch active shipments from the backend API using authentication token headers
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shipments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error('Failed to capture shipment status metrics');
        }
        
        const data = await response.json();
        setShipments(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
  }, [token]);

  // Helper utility to apply dynamic Tailwind color layout badges to logistics states
  const getStatusBadge = (status) => {
    const normalStatus = status ? status.toLowerCase() : 'pending';
    switch (normalStatus) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'in transit':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'out for delivery':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card Actions Panel */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Active Shipments Pipeline</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage multi-warehouse fulfillment logistics.</p>
        </div>
        <button 
          onClick={() => alert('Shipment creation module configuration coming soon!')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition shadow-sm"
        >
          Create New Shipment
        </button>
      </div>

      {/* Main Content Grid Interface Wrapper */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading && (
          <div className="p-12 text-center text-gray-500 text-sm font-medium animate-pulse">
            Loading dynamic pipeline manifests...
          </div>
        )}

        {error && (
          <div className="p-12 text-center text-red-500 text-sm font-medium">
            Error loading pipeline data: {error}
          </div>
        )}

        {!loading && !error && shipments.length === 0 && (
          <div className="p-16 text-center">
            <div className="text-slate-400 text-3xl mb-3">🚢</div>
            <p className="text-gray-500 font-medium text-sm">No shipments found in current cycle.</p>
            <p className="text-xs text-gray-400 mt-1">Use the dispatcher dashboard to link active manifests.</p>
          </div>
        )}

        {!loading && !error && shipments.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Tracking Reference</th>
                  <th className="px-6 py-4">Carrier Partner</th>
                  <th className="px-6 py-4">Linked Order ID</th>
                  <th className="px-6 py-4">Est. Delivery</th>
                  <th className="px-6 py-4">Logistics Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-slate-700">
                {shipments.map((shipment) => (
                  <tr key={shipment._id} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600 text-xs">
                      {shipment.trackingNumber}
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {shipment.courier}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {shipment.order?._id || shipment.order || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(shipment.estimatedDelivery).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(shipment.status)}`}>
                        {shipment.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shipments;