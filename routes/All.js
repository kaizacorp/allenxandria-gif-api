const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
const isValidKey = require("../auth");
require("dotenv").config();

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Responds with all Allen gifs
// defaults to oldest first
// if recent=true, gives newest first (overrides random)
// if random=true, gives all in random order
router.get("/", async (req, res) => {
  if (isValidKey(req, `${process.env.ACCESS_KEY}`)) {
    await connectToMongo();
    const db = mongoose.connection;
    const all = await Gif.find();
    if (req.query.recent && req.query.recent === "true") {
      all.reverse();
      res.send(all);
    } else if (req.query.random && req.query.random === "true") {
      shuffle(all);
      res.send(all);
    } else {
      res.send(all);
    }
  } else {
    res.json("Invalid key provided.");
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
