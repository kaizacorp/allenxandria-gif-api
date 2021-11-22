const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Get
router.get("/", async (req, res) => {
  // Database

  mongoose.connect(
    `mongodb+srv://kaiza:${process.env.PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  const db = mongoose.connection;
  //console.log("Connected to MongoDB database...");
  const count = await Gif.countDocuments();
  const random = Math.floor(Math.random() * count);
  const gif = await Gif.findOne().skip(random);
  res.send(gif);
});

module.exports = router;
