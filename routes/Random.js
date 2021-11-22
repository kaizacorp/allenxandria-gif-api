const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Get
router.get("/", async (req, res) => {
  // Database
  mongoose.connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  const db = mongoose.connection;
  //console.log("Connected to MongoDB database...");
  const all = await Gif.find();
  random = Math.floor(Math.random() * all.length);
  res.send(all[random]);
});

module.exports = router;
