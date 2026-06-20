/**
 * Toast Component
 * @param {string} message - Message to display
 * @param {string} type - "success" | "error" | "warning"
 * @param {boolean} isVisible - Whether toast is visible
 */

import React from 'react';

function Toast({ message, type = 'success', isVisible }) {
  if (!isVisible) return null;

  const styles = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-500',
  };

  return (
    <div className={`fixed bottom-6 right-6 ${styles[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50`}>
      {message}
    </div>
  );
}

export default Toast;