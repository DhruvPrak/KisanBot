import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login({ darkMode, setDarkMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow flex items-center justify-center px-6 py-12 bg-green-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 text-center mb-6">
            Login to KisanBot
          </h2>
          <div className="mb-4">
            <label className="block text-green-700 dark:text-green-400 mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="mb-6">
            <label className="block text-green-700 dark:text-green-400 mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg font-medium transition">
            Login
          </button>
          <p className="text-center text-green-600 dark:text-green-400 mt-4 text-sm">
            Don't have an account? <span className="underline cursor-pointer">Sign Up</span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;