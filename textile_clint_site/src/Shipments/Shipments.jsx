import React, { useState, useEffect } from 'react';

function Shipments() {
  const [shipments, setShipments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shipments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) setShipments(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShipments();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="px-6 py-4 border-b font-bold text-gray-800">Active Shipments Pipeline</div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase border-b">
            <th className="px-6 py-3">Tracking Reference</th>
            <th className="px-6 py-3">Carrier Partner</th>
            <th className="px-6 py-3">Linked Order ID</th>
            <th className="px-6 py-3">Est. Delivery</th>
            <th className="px-6 py-3">Logistics Status</th>
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {shipments.map((shipment) => (
            <tr key={shipment._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-mono text-xs text-indigo-600 font-bold">{shipment.trackingNumber}</td>
              <td className="px-6 py-4 font-medium">{shipment.courier}</td>
              <td className="px-6 py-4 font-mono text-xs text-gray-400">{shipment.order?._id || 'N/A'}</td>
              <td className="px-6 py-4">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</td>
              <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">{shipment.status}</span></td>
            </tr>
          ))}
          {shipments.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-400">No shipments found in current cycle.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Shipments;