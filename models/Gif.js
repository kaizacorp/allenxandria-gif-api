const mongoose = require("mongoose");

const gifSchema = new mongoose.Schema({
  url: String,
  tags: String,
});

module.exports = mongoose.model("gif", gifSchema);
