const express = require('express');
const Game = require('../models/Game');
const Team = require('../models/Team');
const router = express.Router();

// GET all games
router.get('/', async (req, res) => {
  const games = await Game.find().populate('teamA teamB');
  res.send(games);
});

// POST create a new game
router.post('/', async (req, res) => {
  const teamA = await Team.findById(req.body.teamA);
  const teamB = await Team.findById(req.body.teamB);
  if (!teamA || !teamB) return res.status(400).send('Invalid team IDs.');

  let game = new Game({
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    score: req.body.score,
    date: req.body.date || Date.now(),
  });
  game = await game.save();
  res.send(game);
});

// PUT update a game
router.put('/:id', async (req, res) => {
  const game = await Game.findByIdAndUpdate(req.params.id, {
    teamA: req.body.teamA,
    teamB: req.body.teamB,
    score: req.body.score,
    date: req.body.date,
  }, { new: true });

  if (!game) return res.status(404).send('The game was not found.');
  res.send(game);
});

// DELETE a game
router.delete('/:id', async (req, res) => {
  const game = await Game.findByIdAndRemove(req.params.id);
  if (!game) return res.status(404).send('The game was not found.');
  res.send(game);
});

module.exports = router;
