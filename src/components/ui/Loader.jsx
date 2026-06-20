/**
 * Loader Component
 * @param {string} size - "small" | "medium" | "large"
 * @param {string} message - Optional loading message
 */

import React from 'react';

function Loader({ size = 'medium', message = 'Loading...' }) {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-4 border-green-200 border-t-green-700 rounded-full animate-spin`}></div>
      {message && <p className="text-green-700 text-sm">{message}</p>}
    </div>
  );
}

export default Loader;