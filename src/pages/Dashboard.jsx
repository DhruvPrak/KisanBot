import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow px-6 py-12 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Dashboard</h2>
        <p className="text-green-600 max-w-xl mx-auto text-lg">
          Welcome to your KisanBot dashboard. The AI crop advisory chatbot will
          be available here. Type your crop problem and get instant advice
          powered by Gemini AI.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;