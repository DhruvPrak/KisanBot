import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button, Input, Modal, Toast, Loader } from '../components/ui/index';

function UIDemo({ darkMode, setDarkMode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow px-6 py-12 bg-green-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 text-center mb-10">
          UI Component Library
        </h2>

        {/* Buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">Buttons</h3>
          <div className="flex gap-4 flex-wrap">
            <Button label="Primary" variant="primary" onClick={() => alert('Primary clicked!')} />
            <Button label="Secondary" variant="secondary" onClick={() => alert('Secondary clicked!')} />
            <Button label="Danger" variant="danger" onClick={() => alert('Danger clicked!')} />
            <Button label="Disabled" variant="primary" disabled={true} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Input</h3>
          <Input
            placeholder="Type your crop problem here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && <p className="mt-2 text-green-600 text-sm">You typed: {inputValue}</p>}
        </div>

        {/* Modal */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Modal</h3>
          <Button label="Open Modal" onClick={() => setModalOpen(true)} />
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Crop Advisory"
          >
            <p className="text-gray-600">
              This is an example crop advisory modal. In the real app, detailed
              AI advice will appear here for the farmer to read.
            </p>
            <div className="mt-4">
              <Button label="Close" variant="secondary" onClick={() => setModalOpen(false)} />
            </div>
          </Modal>
        </div>

        {/* Toast */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Toast</h3>
          <div className="flex gap-4">
            <Button label="Show Toast" onClick={showToast} />
          </div>
          <Toast message="Advice sent successfully!" type="success" isVisible={toastVisible} />
        </div>

        {/* Loader */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h3 className="text-xl font-bold text-green-700 mb-4">Loader</h3>
          <div className="flex gap-10 items-center">
            <Loader size="small" message="Small" />
            <Loader size="medium" message="Medium" />
            <Loader size="large" message="Large" />
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default UIDemo;