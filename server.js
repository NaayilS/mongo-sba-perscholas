const express = require('express');
const mongoose = require('mongoose');
const app = express();
const teamRoutes = require('./routes/teamRoutes');


app.use(express.json());

mongoose.connect('mongodb://localhost/nbaStats', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Welcome to the NBA Stats Manager');
});

app.use('/api/teams', teamRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
