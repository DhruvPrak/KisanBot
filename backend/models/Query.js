const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  crop: { type: String, required: true },
  problem: { type: String, required: true },
  advice: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Query', querySchema);