const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  teamA: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  score: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
