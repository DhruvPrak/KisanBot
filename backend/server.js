const authRoutes = require('./routes/authRoutes')
const aiRoutes = require('./routes/aiRoutes');
const requireAuth = require('./middleware/auth');
require('dns').setDefaultResultOrder('ipv4first');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

const Query = require('./models/Query');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

app.get('/api/queries/search', requireAuth, async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase() || '';
    const results = await Query.find({
      user: req.user.id,
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

app.get('/api/queries', requireAuth, async (req, res) => {
  try {
    const queries = await Query.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: queries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/queries/:id', requireAuth, async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) return res.status(404).json({ success: false, message: 'Query not found' });
    if (query.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this query' });
    }
    res.status(200).json({ success: true, data: query });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/queries', requireAuth, async (req, res) => {
  try {
    const { crop, problem, advice } = req.body;
    if (!crop || !problem) {
      return res.status(400).json({ success: false, message: 'Crop and problem are required' });
    }
    const newQuery = await Query.create({ crop, problem, advice: advice || '', user: req.user.id });
    res.status(201).json({ success: true, data: newQuery });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/queries/:id', requireAuth, async (req, res) => {
  try {
    const existing = await Query.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Query not found' });
    if (existing.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this query' });
    }
    const updated = await Query.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/queries/:id', requireAuth, async (req, res) => {
  try {
    const existing = await Query.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Query not found' });
    if (existing.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this query' });
    }
    await Query.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`KisanBot backend running on port ${PORT}`);
});