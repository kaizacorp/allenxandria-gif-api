const mongoose = require("mongoose");

const gifSchema = new mongoose.Schema({
  url: String,
  tags: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("gif", gifSchema);
