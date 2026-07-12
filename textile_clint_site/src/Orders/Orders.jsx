import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';

const API_BASE_URL = 'http://localhost:5000/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  
  // States to track UI interactions without using DOM elements
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const defaultFormValues = {
    fabricType: '',
    quantity: '',
    gsm: '',
    colorCode: '',
    priority: 'Standard',
    deliveryDate: '',
    notes: ''
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: defaultFormValues
  });

  const token = localStorage.getItem('token');
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. GET DATA (Fetch)
  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch orders: ${response.statusText}`);
      const data = await response.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError(err.message || 'Error pulling log history.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => { 
    if (token) fetchOrders(); 
  }, [fetchOrders, token]);

  // 2. POST (Create) & PUT (Edit) DATA
  const onSubmit = async (formData) => {
    setSubmitError(null);
    try {
      const isEditing = Boolean(editingId);
      const url = isEditing ? `${API_BASE_URL}/orders/${editingId}` : `${API_BASE_URL}/orders`;
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
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

      if (!response.ok) {
        throw new Error(isEditing ? 'Could not update order via API.' : 'Could not process production order via API.');
      }
      
      reset(defaultFormValues);
      setEditingId(null);
      fetchOrders();
    } catch (err) {
      setSubmitError(err.message || 'Submission error.');
    }
  };

  // Populate form with existing order data for editing
  const handleEditClick = (order) => {
    setEditingId(order._id);
    setSubmitError(null);
    setDeletingId(null); // Cancel any pending deletes
    
    const formattedDate = order.deliveryDate ? new Date(order.deliveryDate).toISOString().split('T')[0] : '';

    reset({
      fabricType: order.fabricType,
      quantity: order.quantity,
      gsm: order.gsm,
      colorCode: order.colorCode || '',
      priority: order.priority || 'Standard',
      deliveryDate: formattedDate,
      notes: order.notes || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSubmitError(null);
    reset(defaultFormValues);
  };

  // 3. DELETE DATA
  const confirmDelete = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete order via API.');
      
      if (editingId === orderId) {
        handleCancelEdit();
      }

      setDeletingId(null);
      fetchOrders();
    } catch (err) {
      setFetchError(err.message || 'Error deleting order.');
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 p-6 max-w-6xl mx-auto">
      
      {/* Form Area */}
      <form onSubmit={handleSubmit(onSubmit)} className={`bg-white p-6 rounded-lg shadow-sm border max-w-4xl mx-auto ${editingId ? 'ring-2 ring-indigo-500' : ''}`}>
        <div className="border-b pb-3 mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            {editingId ? 'Update Production Order' : 'Generate Production Order'}
          </h3>
          <p className="text-xs text-gray-500">
            {editingId ? 'Sync modifications back to the database.' : 'Log new material specs and post to the database.'}
          </p>
        </div>
        
        {submitError && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded border border-red-200">
            {submitError}
          </div>
        )}

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
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Volume (Yards)</label>
              <input 
                type="number" 
                placeholder="500" 
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.quantity ? 'border-red-500' : 'border-gray-300'}`}
                {...register('quantity', { required: 'Required', min: 1 })} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Fabric Weight (GSM)</label>
              <input 
                type="number" 
                placeholder="220" 
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.gsm ? 'border-red-500' : 'border-gray-300'}`}
                {...register('gsm', { required: 'Required', min: 10, max: 1000 })} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Color Code</label>
              <input 
                type="text" 
                placeholder="Indigo #04" 
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-indigo-500"
                {...register('colorCode')} 
              />
            </div>
          </div>
        </div>

        <div className="mb-6 border-t pt-4">
          <h4 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3">Logistics & Scheduling</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Priority Tier</label>
              <select 
                className="w-full border border-gray-300 px-3 py-2 rounded text-sm bg-white focus:outline-indigo-500"
                {...register('priority')}
              >
                <option value="Low">Low</option>
                <option value="Standard">Standard</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1 text-gray-600">Target Delivery Date</label>
              <input 
                type="date" 
                min={todayStr}
                className={`w-full border px-3 py-2 rounded text-sm focus:outline-indigo-500 ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'}`}
                {...register('deliveryDate', { required: 'Required' })} 
              />
            </div>
          </div>
        </div>

        <div className="mb-6 border-t pt-4">
          <label className="block text-xs font-bold mb-1 text-gray-600">Mill Notes</label>
          <textarea 
            rows="2"
            className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-indigo-500"
            {...register('notes')}
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {editingId && (
            <button 
              type="button" 
              onClick={handleCancelEdit}
              className="bg-gray-100 text-gray-700 border border-gray-300 px-4 py-2 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel Edit
            </button>
          )}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"
          >
            {isSubmitting ? 'Syncing to API...' : (editingId ? 'Update via API' : 'Create via API')}
          </button>
        </div>
      </form>

      {/* Table Area */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden max-w-5xl mx-auto">
        <div className="px-6 py-4 border-b font-bold text-gray-800 flex justify-between items-center">
          <span>Database Records ({orders.length})</span>
          {isLoading && <span className="text-xs font-normal text-gray-400 animate-pulse">Fetching API...</span>}
        </div>
        
        {fetchError && (
          <div className="p-6 text-center text-sm text-red-500 bg-red-50">{fetchError}</div>
        )}

        {!fetchError && orders.length === 0 && !isLoading ? (
          <div className="p-6 text-center text-sm text-gray-500">No database records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase border-b">
                  <th className="px-6 py-3">Batch Specs</th>
                  <th className="px-6 py-3">Volume</th>
                  <th className="px-6 py-3">Tier</th>
                  <th className="px-6 py-3 text-right">API Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 font-normal">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{order.fabricType}</div>
                      <div className="text-xs text-gray-400 font-mono">ID: {order._id?.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900 font-medium">{order.quantity} yds</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {deletingId === order._id ? (
                        <div className="flex justify-end gap-2 items-center">
                          <span className="text-xs text-red-600 font-bold">Sure?</span>
                          <button 
                            onClick={() => confirmDelete(order._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium"
                          >
                            Yes, Delete
                          </button>
                          <button 
                            onClick={() => setDeletingId(null)}
                            className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleEditClick(order)}
                            className="text-indigo-600 hover:text-indigo-900 text-xs font-medium"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => setDeletingId(order._id)}
                            className="text-red-600 hover:text-red-900 text-xs font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      )}
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