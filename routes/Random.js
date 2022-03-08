const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Responds with a random Allen gif
router.get("/", async (req, res) => {
  // Database
  await connectToMongo();
  const db = mongoose.connection;
  const count = await Gif.countDocuments();
  const random = Math.floor(Math.random() * count);
  const gif = await Gif.findOne().skip(random);
  res.send(gif);
  //db.close();
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
