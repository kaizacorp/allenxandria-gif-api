const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Responds with the current total count of Allen gifs
router.get("/", async (req, res) => {
  // Database
  await connectToMongo();
  const db = mongoose.connection;
  const count = await Gif.countDocuments();
  res.json(count);
  db.close();
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://kaiza:${process.env.PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
