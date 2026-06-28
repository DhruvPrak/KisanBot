const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let queries = [
  { id: 1, crop: 'Beans', problem: 'Yellow spots on leaves', advice: 'Could be fungal infection. Remove affected leaves.', createdAt: new Date() },
  { id: 2, crop: 'Tomato', problem: 'Pest attack on stems', advice: 'Apply neem oil spray every 3 days.', createdAt: new Date() },
  { id: 3, crop: 'Potato', problem: 'Leaves turning brown', advice: 'Possible blight. Reduce watering and apply fungicide.', createdAt: new Date() },
];
let nextId = 4;

// GET all queries
app.get('/api/queries', (req, res) => {
  res.status(200).json({ success: true, data: queries });
});

// GET single query
app.get('/api/queries/:id', (req, res) => {
  const query = queries.find(q => q.id === parseInt(req.params.id));
  if (!query) return res.status(404).json({ success: false, message: 'Query not found' });
  res.status(200).json({ success: true, data: query });
});

// POST create new query
app.post('/api/queries', (req, res) => {
  const { crop, problem, advice } = req.body;
  if (!crop || !problem) {
    return res.status(400).json({ success: false, message: 'Crop and problem are required' });
  }
  const newQuery = { id: nextId++, crop, problem, advice: advice || '', createdAt: new Date() };
  queries.push(newQuery);
  res.status(201).json({ success: true, data: newQuery });
});

// PUT update query
app.put('/api/queries/:id', (req, res) => {
  const index = queries.findIndex(q => q.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Query not found' });
  queries[index] = { ...queries[index], ...req.body };
  res.status(200).json({ success: true, data: queries[index] });
});

// DELETE query
app.delete('/api/queries/:id', (req, res) => {
  const index = queries.findIndex(q => q.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Query not found' });
  queries.splice(index, 1);
  res.status(204).send();
});

// GET search queries
app.get('/api/queries/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = queries.filter(query =>
    query.crop.toLowerCase().includes(q) ||
    query.problem.toLowerCase().includes(q)
  );
  res.status(200).json({ success: true, data: results });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`KisanBot backend running on port ${PORT}`);
});