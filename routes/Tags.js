const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};

// Responds with tags given gif url
router.get("/", async (req, res) => {
  await connectToMongo();
  const db = mongoose.connection;
  const [gif] = await Gif.find({ url: req.query.url });
  if (!gif) {
    res.send({});
  } else {
    res.send({ tags: gif.tags });
  }
});

module.exports = router;
