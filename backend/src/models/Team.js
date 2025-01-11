const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamName:{type: String, required: true},
  budget: { type: Number, default: 5000000 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
});

module.exports = mongoose.model('Team', teamSchema);