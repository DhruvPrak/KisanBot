import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="bg-green-50 dark:bg-gray-800 py-20 px-6 text-center">
      <h1 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4">
        Instant Crop Advice for Uttarakhand Farmers
      </h1>
      <p className="text-lg text-green-600 dark:text-green-400 mb-8 max-w-xl mx-auto">
        Type your crop problem in plain language and get helpful advice instantly — powered by AI.
      </p>
      <Link
        to="/dashboard"
        className="bg-green-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-800"
      >
        Start Chatting
      </Link>
    </div>
  );
}

export default Hero;