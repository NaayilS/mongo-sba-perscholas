const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  championships: { type: Number, default: 0 },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
