const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = new Schema({
  userName: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model("User", UserModel);
