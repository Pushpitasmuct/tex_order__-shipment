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
        window.location.reload();
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left Column: Industrial Branding Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-900 justify-center items-center relative overflow-hidden">
        {/* Decorative background grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-md p-12 text-white z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Textile Logistics Hub
          </h1>
          <p className="text-indigo-200 text-lg leading-relaxed">
            Centralized management for tracking buyer orders, manufacturing workflows, live inventory levels, and global shipments.
          </p>
          <div className="mt-8 flex gap-2">
            <span className="px-3 py-1 bg-indigo-800 text-xs rounded-full border border-indigo-700 text-indigo-300">v1.0 Enterprise</span>
            <span className="px-3 py-1 bg-indigo-800 text-xs rounded-full border border-indigo-700 text-indigo-300">Secure Gateway</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-100">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-500 mt-2">Please sign in to access your dashboard terminal.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Corporate Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400 text-gray-900" 
                required 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-700 text-sm font-semibold">Password</label>
                <a href="#forgot" className="text-xs text-indigo-600 hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition placeholder-gray-400 text-gray-900" 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 active:scale-[0.99] transition duration-150"
            >
              Sign In to System
            </button>

            <p className="text-sm text-center text-gray-600 pt-2">
              New business partner?{' '}
              <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                Register Platform Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;