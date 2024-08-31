const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose')

const path = require('path');
const { createNewUser } = require('./controllers/handleUser');
const connectDB = require('./config/dbConnect');
const { storeExercise, searchExerciseLog } = require('./controllers/exerciseController');

connectDB();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// POST /api/users
app.post('/api/users', createNewUser);

// POST /api/users/:_id/exercises
app.post('/api/users/:_id/exercises', storeExercise);

// GET /api/users/:id/logs?[from][&to][&limit]
app.get('/api/users/:_id/logs', searchExerciseLog);


mongoose.connection.once("open", () => {
  const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
  });

  console.log("Connected to MongoDB!");
})

