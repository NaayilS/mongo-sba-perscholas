const mongoose = require('mongoose');
// Team Schema 
const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  championships: { type: Number, default: 0 },
});
// Index on teamName for fast lookups 
teamSchema.index({ teamName: 1 });
// Create and export the Team model
const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
