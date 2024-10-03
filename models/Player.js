const mongoose = require('mongoose');
// Player Schema
const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  position: { type: String, required: true },
  stats: {
    points: { type: Number, default: 0 },
    rebounds: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
  },
});
// Create and export the Player model
const Player = mongoose.model('Player', playerSchema);
module.exports = Player;
