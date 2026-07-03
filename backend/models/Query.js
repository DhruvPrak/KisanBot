const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  crop: { type: String, required: true },
  problem: { type: String, required: true },
  advice: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', querySchema);