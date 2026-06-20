import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About({ darkMode, setDarkMode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow px-6 py-12 bg-green-50 dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-4">About KisanBot</h2>
        <p className="text-green-600 dark:text-green-400 max-w-xl mx-auto text-lg">
          KisanBot is an AI-powered crop advisory chatbot built for farmers in the
          high-altitude villages of Kedarnath Valley, Uttarakhand. Our goal is to
          give every farmer instant access to crop advice — no waiting, no travel,
          just type and get help.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;