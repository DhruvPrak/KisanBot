import React from 'react';

function Card({ title, description, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">{title}</h3>
      <p className="text-green-600 dark:text-green-400">{description}</p>
    </div>
  );
}

export default Card;