const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {dbName: "ExerciseTracker"});
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
