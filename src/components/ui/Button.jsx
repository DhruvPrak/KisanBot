/**
 * Button Component
 * @param {string} label - Text to display on the button
 * @param {function} onClick - Function to call when button is clicked
 * @param {string} variant - "primary" | "secondary" | "danger"
 * @param {boolean} disabled - Whether button is disabled
 */

import React from 'react';

function Button({ label, onClick, variant = 'primary', disabled = false }) {
  const styles = {
    primary: 'bg-green-700 text-white hover:bg-green-800',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition ${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {label}
    </button>
  );
}

export default Button;