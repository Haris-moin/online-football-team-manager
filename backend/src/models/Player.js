const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  transferListed: { type: Boolean, default: false },
  askingPrice: { type: Number },
});

module.exports = mongoose.model('Player', playerSchema);
