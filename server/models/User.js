const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  profileImage: String,
});

const User = new mongoose.model("User", userschema);

module.exports = User;
