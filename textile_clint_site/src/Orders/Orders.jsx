import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const API_BASE_URL = 'http://localhost:5000/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      fabricType: '',
      quantity: '',
      gsm: '',
      colorCode: '',
      priority: 'Standard',
      deliveryDate: '',
      notes: ''
    }
  });

  const token = localStorage.getItem('token');

  // Prevent selecting past dates in the UI
  const todayStr = new Date().toISOString().split('T')[0];

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch orders: ${response.statusText}`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFetchError(err.message || 'Error pulling log history.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => { if (token) fetchOrders(); }, [fetchOrders, token]);

  const onSubmit = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          gsm: Number(formData.gsm),
          fabricType: formData.fabricType.trim()
        })
      });

      if (!response.ok) throw new Error('Could not process production order.');
      reset();
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert(err.message || 'Submission error.');
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      {/* Expanded Order Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-sm border max-w-4xl mx-auto">
        <div className="border-b pb-3 mb-6">
          <h3 className="text-lg font-bold text-gray-900">Generate Production Order</h3>
          <p className="text-xs text-gray-500">Log material specs and schedules directly to the weaving floor queue.</p>
        </div>
        
        {/* Section 1: Fabric Spec Fields */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Material Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Fabric Variant</label>
              <input 
                type="text" 
                placeholder="Denim, Linen..." 
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.fabricType ? 'border-red-500' : 'border-gray-300'}`}
                {...register('fabricType', { required: 'Required field' })} 
              />
              {errors.fabricType && <span className="text-xs text-red-500 mt-1 block">{errors.fabricType.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Volume (Yards)</label>
              <input 
                type="number" 
                placeholder="500" 
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                {...register('quantity', { required: 'Required', min: { value: 1, message: 'Min 1 yd' } })} 
              />
              {errors.quantity && <span className="text-xs text-red-500 mt-1 block">{errors.quantity.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Fabric Weight (GSM)</label>
              <input 
                type="number" 
                placeholder="220" 
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.gsm ? 'border-red-500' : 'border-gray-300'}`}
                {...register('gsm', { required: 'Required', min: 10, max: 1000 })} 
              />
              {errors.gsm && <span className="text-xs text-red-500 mt-1 block">{errors.gsm.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Color Code / Wash</label>
              <input 
                type="text" 
                placeholder="Indigo #04, Raw" 
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-indigo-500"
                {...register('colorCode')} 
              />
            </div>
          </div>
        </div>

        {/* Section 2: Logistics & Priority */}
        <div className="mb-6 border-t pt-4">
          <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Logistics & Scheduling</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Priority Tier</label>
              <select 
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm bg-white focus:outline-indigo-500"
                {...register('priority')}
              >
                <option value="Low">Low (Backlog Run)</option>
                <option value="Standard">Standard Delivery</option>
                <option value="High">High Priority (Expedited)</option>
                <option value="Critical">Critical (Line-Stop Risk)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Target Delivery Date</label>
              <input 
                type="date" 
                min={todayStr}
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'}`}
                {...register('deliveryDate', { required: 'Select a delivery target date' })} 
              />
              {errors.deliveryDate && <span className="text-xs text-red-500 mt-1 block">{errors.deliveryDate.message}</span>}
            </div>
          </div>
        </div>

        {/* Section 3: Custom Text Area Notes */}
        <div className="mb-6 border-t pt-4">
          <label className="block text-xs font-bold mb-1 text-gray-600">Special Production Instructions / Mill Notes</label>
          <textarea 
            rows="3"
            placeholder="Specify dynamic shrinkage parameters, finish coating rules, or structural backing requests..."
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-indigo-500"
            {...register('notes', { maxLength: { value: 500, message: 'Notes must be within 500 characters' } })}
          ></textarea>
          {errors.notes && <span className="text-xs text-red-500 mt-1 block">{errors.notes.message}</span>}
        </div>

        {/* Enhanced High-End Dispatch Action Bar */}
       <div className="flex justify-end mt-4">
  <button 
    type="submit" 
    disabled={isSubmitting}
    className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
  >
    {isSubmitting ? 'Dispatching...' : 'Dispatch Production Run'}
  </button>
</div>
      </form>

      {/* Simplified Dynamic Logs Viewport */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden max-w-5xl mx-auto">
        <div className="px-6 py-4 border-b font-bold text-gray-800 flex justify-between items-center">
          <span>Active Factory Logs ({orders.length})</span>
          {isLoading && <span className="text-xs font-normal text-gray-400 animate-pulse">Polling Server...</span>}
        </div>
        
        {fetchError ? (
          <div className="p-6 text-center text-sm text-red-500 bg-red-50">{fetchError}</div>
        ) : orders.length === 0 && !isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500">No manufacturing runs scheduled.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase border-b">
                  <th className="px-6 py-3">Batch Specs</th>
                  <th className="px-6 py-3">Volume</th>
                  <th className="px-6 py-3">Schedule Info</th>
                  <th className="px-6 py-3">Tier</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 font-normal">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{order.fabricType}</div>
                      <div className="text-xs text-gray-400 font-mono">ID: {order._id?.slice(-8)} | GSM: {order.gsm}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 font-medium">{order.quantity?.toLocaleString()} yds</div>
                      <div className="text-xs text-gray-500">{order.colorCode || 'N/A (Raw Finish)'}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="text-gray-700 font-medium">Target: {order.deliveryDate || 'Unscheduled'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        order.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                        order.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {order.priority || 'Standard'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {order.status || 'In Queue'}
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

export default Orders;