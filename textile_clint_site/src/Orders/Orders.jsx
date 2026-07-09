import React, { useState, useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [fabricType, setFabricType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [gsm, setGsm] = useState('');

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fabricType, quantity: Number(quantity), gsm: Number(gsm) })
      });
      if (response.ok) {
        setFabricType(''); setQuantity(''); setGsm('');
        fetchOrders(); // Refresh table listings
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreateOrder} className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Generate Production Order</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold mb-1">Fabric Variant</label>
            <input type="text" placeholder="Denim, Linen..." value={fabricType} onChange={(e) => setFabricType(e.target.value)} className="w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500" required />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Volume (Yards)</label>
            <input type="number" placeholder="500" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500" required />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1">Fabric Weight (GSM)</label>
            <input type="number" placeholder="220" value={gsm} onChange={(e) => setGsm(e.target.value)} className="w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500" required />
          </div>
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700">Dispatch Order</button>
      </form>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b font-bold text-gray-800">Order Logs</div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase border-b">
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Variant</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">GSM</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-xs text-gray-400">{order._id}</td>
                <td className="px-6 py-4 font-medium">{order.fabricType}</td>
                <td className="px-6 py-4">{order.quantity} yds</td>
                <td className="px-6 py-4">{order.gsm}</td>
                <td className="px-6 py-4"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;