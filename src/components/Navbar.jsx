import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-green-700 dark:bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🌾 KisanBot</h1>
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-green-200">Home</Link>
        <Link to="/about" className="hover:text-green-200">About</Link>
        <Link to="/dashboard" className="hover:text-green-200">Dashboard</Link>
        <Link to="/login" className="hover:text-green-200">Login</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-white dark:bg-yellow-400 text-green-800 dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;