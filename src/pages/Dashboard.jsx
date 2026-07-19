import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader, Toast } from '../components/ui/index';

function Dashboard({ darkMode, setDarkMode }) {
  const [queries, setQueries] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [form, setForm] = useState({ crop: '', problem: '', advice: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/queries');
      const data = await response.json();
      setQueries(data.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
      showToast('Failed to load queries. Is the backend running?');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  const getAIAdvice = async () => {
    if (!form.crop || !form.problem) {
      showToast('Enter crop and problem first.');
      return;
    }
    setAiLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/ai/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: form.crop, problem: form.problem }),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, advice: data.advice });
      } else {
        showToast(data.message || 'AI advice failed.');
      }
    } catch (err) {
      showToast('Could not reach AI service.');
    }
    setAiLoading(false);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res;
    if (editingId) {
      res = await fetch(`http://localhost:5000/api/queries/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      res = await fetch('http://localhost:5000/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }

    if (!res.ok) {
      showToast(res.status === 401 ? 'You must be logged in to do this.' : 'Something went wrong.');
      return;
    }

    showToast(editingId ? 'Query updated!' : 'Query created!');
    setForm({ crop: '', problem: '', advice: '' });
    setEditingId(null);
    fetchQueries();
  } catch (err) {
    showToast('Something went wrong.');
  }
};

  const handleEdit = (query) => {
    setForm({ crop: query.crop, problem: query.problem, advice: query.advice });
    setEditingId(query._id);
  };

  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/queries/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      showToast(res.status === 401 ? 'You must be logged in to delete.' : 'Delete failed.');
      return;
    }
    showToast('Query deleted!');
    fetchQueries();
  } catch (err) {
    showToast('Delete failed.');
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-grow px-6 py-12 bg-green-50 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 text-center mb-8">
          Dashboard — Crop Queries
        </h2>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-gray-700">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-4">
            {editingId ? 'Edit Query' : 'New Crop Query'}
          </h3>
          <input
            className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Crop"
            value={form.crop}
            onChange={(e) => setForm({ ...form, crop: e.target.value })}
            required
          />
          <input
            className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Problem"
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
            required
          />

          <button
            type="button"
            onClick={getAIAdvice}
            disabled={aiLoading}
            className="mb-2 bg-green-100 text-green-800 px-3 py-1 rounded border border-green-400 hover:bg-green-200 disabled:opacity-50"
          >
            {aiLoading ? <Loader size="small" /> : '✨ Get AI Advice'}
          </button>

          <input
            className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Advice"
            value={form.advice}
            onChange={(e) => setForm({ ...form, advice: e.target.value })}
          />
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            {editingId ? 'Update' : 'Add Query'}
          </button>
          {editingId && (
            <button
              type="button"
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => { setEditingId(null); setForm({ crop: '', problem: '', advice: '' }); }}
            >
              Cancel
            </button>
          )}
        </form>

        {loading && (
          <div className="flex justify-center mt-10">
            <Loader size="large" message="Loading crop queries..." />
          </div>
        )}

        {error && (
          <p className="text-center text-red-500 mt-10">
            Could not connect to backend. Please make sure the server is running.
          </p>
        )}

        {!loading && !error && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
            {queries.map((query) => (
              <div key={query._id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-green-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-green-800 dark:text-green-300">
                    🌾 {query.crop}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {new Date(query.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <span className="font-medium">Problem:</span> {query.problem}
                </p>
                <p className="text-green-700 dark:text-green-400 mb-4">
                  <span className="font-medium">Advice:</span> {query.advice}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(query)} className="text-sm px-3 py-1 rounded border border-green-600 text-green-700 dark:text-green-300">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(query._id)} className="text-sm px-3 py-1 rounded border border-red-500 text-red-500">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Toast message={toastMessage} type="error" isVisible={toastVisible} />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;