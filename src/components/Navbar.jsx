import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🌾 KisanBot</h1>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-green-200">Home</Link>
        <Link to="/about" className="hover:text-green-200">About</Link>
        <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
        <Link to="/login" className="hover:text-green-200">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;