const mongoose = require('mongoose');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Game = require('./models/Game');

// Connect to MongoDB
mongoose.connect('mongodb+srv://NaayilS:Evanston2036@cluster0.w1xwr.mongodb.net/nbaStats?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Sample Teams
const teams = [
  { teamName: "Los Angeles Lakers", city: "Los Angeles", championships: 17 },
  { teamName: "Chicago Bulls", city: "Chicago", championships: 6 },
  { teamName: "Golden State Warriors", city: "San Francisco", championships: 7 },
  { teamName: "Miami Heat", city: "Miami", championships: 3 },
  { teamName: "Boston Celtics", city: "Boston", championships: 17 }
];

// Sample Players
const players = [
  { playerName: "LeBron James", team: null, position: "Forward", stats: { points: 27, rebounds: 7, assists: 7 } },
  { playerName: "Stephen Curry", team: null, position: "Guard", stats: { points: 30, rebounds: 5, assists: 6 } },
  { playerName: "Zach LaVine", team: null, position: "Guard", stats: { points: 25, rebounds: 4, assists: 5 } },
  { playerName: "Jimmy Butler", team: null, position: "Forward", stats: { points: 21, rebounds: 6, assists: 5 } },
  { playerName: "Jayson Tatum", team: null, position: "Forward", stats: { points: 26, rebounds: 7, assists: 4 } }
];

// Sample Games
const games = [
  { teamA: null, teamB: null, score: "Lakers 101 - Bulls 99", date: "2024-01-15" },
  { teamA: null, teamB: null, score: "Celtics 105 - Warriors 98", date: "2024-02-05" },
  { teamA: null, teamB: null, score: "Heat 99 - Lakers 110", date: "2024-03-10" },
  { teamA: null, teamB: null, score: "Bulls 112 - Warriors 115", date: "2024-04-20" },
  { teamA: null, teamB: null, score: "Celtics 102 - Heat 100", date: "2024-05-12" }
];

// Function to insert data
async function insertSampleData() {
  try {
    // Insert Teams
    const insertedTeams = await Team.insertMany(teams);
    console.log('Teams inserted:', insertedTeams);

    // Update Players with team IDs
    players[0].team = insertedTeams[0]._id; // Lakers
    players[1].team = insertedTeams[2]._id; // Warriors
    players[2].team = insertedTeams[1]._id; // Bulls
    players[3].team = insertedTeams[3]._id; // Heat
    players[4].team = insertedTeams[4]._id; // Celtics
    const insertedPlayers = await Player.insertMany(players);
    console.log('Players inserted:', insertedPlayers);

    // Update Games with team IDs
    games[0].teamA = insertedTeams[0]._id; // Lakers
    games[0].teamB = insertedTeams[1]._id; // Bulls
    games[1].teamA = insertedTeams[4]._id; // Celtics
    games[1].teamB = insertedTeams[2]._id; // Warriors
    games[2].teamA = insertedTeams[3]._id; // Heat
    games[2].teamB = insertedTeams[0]._id; // Lakers
    games[3].teamA = insertedTeams[1]._id; // Bulls
    games[3].teamB = insertedTeams[2]._id; // Warriors
    games[4].teamA = insertedTeams[4]._id; // Celtics
    games[4].teamB = insertedTeams[3]._id; // Heat
    const insertedGames = await Game.insertMany(games);
    console.log('Games inserted:', insertedGames);

    console.log('All sample data inserted successfully!');
  } catch (err) {
    console.error('Error inserting sample data:', err);
  } finally {
    mongoose.disconnect();
  }
}

insertSampleData();
