import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import UIDemo from './pages/UIDemo';
import ProtectedRoute from './ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/about" element={<About darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/login" element={<Login darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/register" element={<Register darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/uidemo" element={<UIDemo darkMode={darkMode} setDarkMode={setDarkMode} />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;