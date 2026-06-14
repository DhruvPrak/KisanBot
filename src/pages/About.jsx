import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow px-6 py-12 bg-green-50 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">About KisanBot</h2>
        <p className="text-green-600 max-w-xl mx-auto text-lg">
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