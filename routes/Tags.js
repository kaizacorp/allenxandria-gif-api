const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Responds with tags given gif url
router.get("/", async (req, res) => {
  await connectToMongo();
  const db = mongoose.connection;
  const tags = await Gif.find({ url: req.query.url });
  if (tags.length === 0) {
    res.send({});
  } else {
    res.send(tags[0]);
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
