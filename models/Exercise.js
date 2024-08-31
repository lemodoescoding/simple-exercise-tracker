const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseModel = new Schema({
  userName: {
    type: String,
    required: true,
    maxLength: 24,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
})

module.exports = mongoose.model('Excersize', ExerciseModel);
