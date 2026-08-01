import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader, Toast } from '../components/ui/index';
import { API_URL } from '../config';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

function Dashboard({ darkMode, setDarkMode }) {
  const [queries, setQueries] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [form, setForm] = useState({ crop: '', problem: '', advice: '' });
  const [editingId, setEditingId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [aiGenerated, setAiGenerated] = useState(false);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/queries`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(true);
        setLoading(false);
        showToast(response.status === 401 ? 'Session expired. Please log in again.' : 'Failed to load queries.');
        return;
      }
      setQueries(data.data || []);
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
    setAiGenerated(false);
    try {
      const res = await fetch(`${API_URL}/api/ai/advice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: form.crop, problem: form.problem }),
      });
      const data = await res.json();
      if (data.success) {
        setForm({ ...form, advice: data.advice });
        setAiGenerated(true);
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

    const errors = {};
    if (!form.crop.trim()) errors.crop = 'Crop name is required.';
    else if (form.crop.trim().length < 2) errors.crop = 'Crop name must be at least 2 characters.';
    if (!form.problem.trim()) errors.problem = 'Problem description is required.';
    else if (form.problem.trim().length < 5) errors.problem = 'Please describe the problem in a bit more detail.';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/api/queries/${editingId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${API_URL}/api/queries`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(form),
        });
      }

      if (!res.ok) {
        showToast(res.status === 401 ? 'You must be logged in to do this.' : 'Something went wrong.');
        return;
      }

      showToast(editingId ? 'Query updated!' : 'Query created!');
      setForm({ crop: '', problem: '', advice: '' });
      setFormErrors({});
      setEditingId(null);
      fetchQueries();
    } catch (err) {
      showToast('Something went wrong.');
    }
  };

  const handleEdit = (query) => {
    setForm({ crop: query.crop, problem: query.problem, advice: query.advice });
    setFormErrors({});
    setAiGenerated(false);
    setEditingId(query._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this query? This cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/queries/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
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
            className={`w-full mb-1 p-2 border rounded dark:bg-gray-700 dark:text-white ${formErrors.crop ? 'border-red-500' : ''}`}
            placeholder="Crop"
            value={form.crop}
            onChange={(e) => setForm({ ...form, crop: e.target.value })}
          />
          {formErrors.crop && <p className="text-red-500 text-sm mb-2">{formErrors.crop}</p>}

          <input
            className={`w-full mb-1 p-2 border rounded dark:bg-gray-700 dark:text-white ${formErrors.problem ? 'border-red-500' : ''}`}
            placeholder="Problem"
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
          />
          {formErrors.problem && <p className="text-red-500 text-sm mb-2">{formErrors.problem}</p>}

          <button
            type="button"
            onClick={getAIAdvice}
            disabled={aiLoading}
            className="mb-3 flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:from-green-600 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {aiLoading ? (
              <>
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                </span>
                Thinking...
              </>
            ) : (
              <>✨ Get AI Advice</>
            )}
          </button>

          <div className="mb-4">
            {aiGenerated && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-100 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 py-0.5 rounded-full mb-1">
                ✨ AI Generated
              </span>
            )}
            <textarea
              className={`w-full p-3 border rounded-lg leading-relaxed transition-colors ${
                aiGenerated
                  ? 'bg-emerald-50 border-emerald-300 dark:bg-emerald-950/30 dark:border-emerald-700'
                  : 'dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              } dark:text-white`}
              placeholder="Advice will appear here — or type your own"
              rows={3}
              value={form.advice}
              onChange={(e) => { setForm({ ...form, advice: e.target.value }); setAiGenerated(false); }}
            />
          </div>
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            {editingId ? 'Update' : 'Add Query'}
          </button>
          {editingId && (
            <button
              type="button"
              className="ml-2 px-4 py-2 rounded border"
              onClick={() => { setEditingId(null); setForm({ crop: '', problem: '', advice: '' }); setFormErrors({}); setAiGenerated(false); }}
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

        {!loading && !error && queries.length === 0 && (
          <div className="max-w-4xl mx-auto text-center py-16">
            <p className="text-5xl mb-4">🌱</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No queries yet — add your first one above!
            </p>
          </div>
        )}

        {!loading && !error && queries.length > 0 && (
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