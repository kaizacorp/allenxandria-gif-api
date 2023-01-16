const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Responds with random Allen gif(s)
// if count provided will respond with that many
// single gif otherwise
router.get("/", async (req, res) => {
  await connectToMongo();
  const db = mongoose.connection;
  const count = Number(req.query.count);
  if (count && count > 0) {
    const randomGifs = await Gif.aggregate([{ $sample: { size: count } }]);
    res.send(randomGifs);
  } else {
    const randomGif = await Gif.aggregate([{ $sample: { size: 1 } }]);
    res.send(randomGif[0]);
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
