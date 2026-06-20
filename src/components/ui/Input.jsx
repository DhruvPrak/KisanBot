/**
 * Input Component
 * @param {string} placeholder - Placeholder text
 * @param {string} value - Current value
 * @param {function} onChange - Function called on input change
 * @param {string} type - "text" | "email" | "password"
 * @param {boolean} disabled - Whether input is disabled
 */

import React from 'react';

function Input({ placeholder, value, onChange, type = 'text', disabled = false }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 disabled:opacity-50"
    />
  );
}

export default Input;