const mongoose = require("mongoose");

const gifSchema = new mongoose.Schema({
  url: String,
  tags: String,
  date: String,
  points: Number,
});

module.exports = mongoose.model("gif", gifSchema);
