require('dns').setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const Query = require('./models/Query');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET search queries (moved above /:id so it doesn't get swallowed)
app.get('/api/queries/search', async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase() || '';
    const results = await Query.find({
      $or: [
        { crop: { $regex: q, $options: 'i' } },
        { problem: { $regex: q, $options: 'i' } }
      ]
    });
    res.status(200).json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all queries
app.get('/api/queries', async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: queries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single query
app.get('/api/queries/:id', async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json({ success: false, message: 'Query not found' });
    res.status(200).json({ success: true, data: query });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create new query
app.post('/api/queries', async (req, res) => {
  try {
    const { crop, problem, advice } = req.body;
    if (!crop || !problem) {
      return res.status(400).json({ success: false, message: 'Crop and problem are required' });
    }
    const newQuery = await Query.create({ crop, problem, advice: advice || '' });
    res.status(201).json({ success: true, data: newQuery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update query
app.put('/api/queries/:id', async (req, res) => {
  try {
    const updated = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Query not found' });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE query
app.delete('/api/queries/:id', async (req, res) => {
  try {
    const deleted = await Query.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Query not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`KisanBot backend running on port ${PORT}`);
});