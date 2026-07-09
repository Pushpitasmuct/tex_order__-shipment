import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        window.location.reload(); // Quick reset to render authenticated Navbar/Sidebar
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">System Gateway Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Corporate Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-indigo-500" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-indigo-500" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Log In</button>
        <p className="mt-4 text-sm text-center text-gray-600">New partner? <Link to="/register" className="text-indigo-600 hover:underline">Register here</Link></p>
      </form>
    </div>
  );
}

export default Login;