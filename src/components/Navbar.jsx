import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = "hover:text-green-200 py-2 md:py-0";

  return (
    <nav className="bg-green-700 dark:bg-gray-800 text-white px-4 sm:px-6 py-4 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold">🌾 KisanBot</h1>

        {/* Desktop nav — hidden below md breakpoint */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className={linkClass}>Home</Link>
          <Link to="/about" className={linkClass}>About</Link>
          <Link to="/dashboard" className={linkClass}>Dashboard</Link>
          <Link to="/login" className={linkClass}>Login</Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-yellow-400 text-green-800 dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Mobile: dark toggle + hamburger button — visible below md breakpoint */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white dark:bg-yellow-400 text-green-800 dark:text-gray-900 px-3 py-1 rounded-full text-sm font-medium"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="text-2xl leading-none w-10 h-10 flex items-center justify-center"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-3 pt-3 border-t border-green-600 dark:border-gray-700">
          <Link to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;