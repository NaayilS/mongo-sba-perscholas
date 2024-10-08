const express = require('express');
const mongoose = require('mongoose');
const app = express();
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const gameRoutes = require('./routes/gameRoutes');

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect('mongodb+srv://NaayilS:Evanston2036@cluster0.w1xwr.mongodb.net/nbaStats?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB Atlas...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
// Base route for welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the NBA Stats Manager');
});
// Use the routes for the three models
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/games', gameRoutes);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
