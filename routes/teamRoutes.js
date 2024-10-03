const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// GET all teams
router.get('/', async (req, res) => {
  const teams = await Team.find();
  res.send(teams);
});

// POST create a new team
router.post('/', async (req, res) => {
  let team = new Team({
    teamName: req.body.teamName,
    city: req.body.city,
    championships: req.body.championships || 0,
  });
  team = await team.save();
  res.send(team);
});

// PUT update a team
router.put('/:id', async (req, res) => {
  const team = await Team.findByIdAndUpdate(req.params.id, {
    teamName: req.body.teamName,
    city: req.body.city,
    championships: req.body.championships,
  }, { new: true });

  if (!team) return res.status(404).send('The team was not found.');
  res.send(team);
});

// DELETE a team
router.delete('/:id', async (req, res) => {
  const team = await Team.findByIdAndRemove(req.params.id);
  if (!team) return res.status(404).send('The team was not found.');
  res.send(team);
});

module.exports = router;
