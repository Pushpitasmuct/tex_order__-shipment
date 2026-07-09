import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration complete! Please sign in.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Account Onboarding</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name / Factory Entity</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-indigo-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Corporate Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-indigo-500" required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md focus:outline-indigo-500" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">Register Entity</button>
        <p className="mt-4 text-sm text-center text-gray-600">Already registered? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link></p>
      </form>
    </div>
  );
}

export default Register;