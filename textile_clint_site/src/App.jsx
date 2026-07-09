import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import Home from './Home/Home.jsx';
import Orders from './Orders/Orders.jsx';
import Shipments from './Shipments/Shipments.jsx';

// Fixed pathways to match your exact lowercase filenames in /src/components/
import Navbar from './components/navbar.jsx';
import Sidebar from './components/sidebar.jsx';

function App() {
  // Temporary fallback so you can see your navbar/sidebar work right now without a backend token!
  const isAuthenticated = localStorage.getItem('token') || true;

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Renders at the top if logged in */}
        {isAuthenticated && <Navbar />}
        
        <div className="flex flex-1 overflow-hidden">
          {/* Renders on the left if logged in */}
          {isAuthenticated && <Sidebar />}
          
          {/* Main Display Route Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/shipments" element={<Shipments />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;