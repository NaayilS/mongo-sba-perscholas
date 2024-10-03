const express = require('express');
const Player = require('../models/Player');
const Team = require('../models/Team');
const router = express.Router();

// GET all players
router.get('/', async (req, res) => {
  const players = await Player.find().populate('team');
  res.send(players);
});

// POST create a new player
router.post('/', async (req, res) => {
  const team = await Team.findById(req.body.team);
  if (!team) return res.status(400).send('Invalid team ID.');

  let player = new Player({
    playerName: req.body.playerName,
    team: req.body.team,
    position: req.body.position,
    stats: req.body.stats || { points: 0, rebounds: 0, assists: 0 },
  });
  player = await player.save();
  res.send(player);
});

// PUT update a player
router.put('/:id', async (req, res) => {
  const player = await Player.findByIdAndUpdate(req.params.id, {
    playerName: req.body.playerName,
    team: req.body.team,
    position: req.body.position,
    stats: req.body.stats,
  }, { new: true });

  if (!player) return res.status(404).send('The player was not found.');
  res.send(player);
});

// DELETE a player
router.delete('/:id', async (req, res) => {
  const player = await Player.findByIdAndRemove(req.params.id);
  if (!player) return res.status(404).send('The player was not found.');
  res.send(player);
});

module.exports = router;
