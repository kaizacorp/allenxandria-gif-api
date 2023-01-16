const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Responds with all Allen gifs
router.get("/", async (req, res) => {
  await connectToMongo();
  const db = mongoose.connection;
  const all = await Gif.find();
  if (req.query.recent && req.query.recent === "true") {
    all.reverse();
    res.send(all);
  } else {
    res.send(all);
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
