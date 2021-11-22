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
  const q = await Gif.aggregate([
    {
      $search: {
        index: "tags",
        text: {
          query: req.query.tags,
          path: "tags",
          score: {
            function: {
              score: "relevance",
            },
          },
        },
      },
    },
    { $limit: 5 },
    {
      $project: { _id: 0, url: 1, tags: 1, score: { $meta: "searchScore" } },
    },
  ]);
  res.send(q);
});

module.exports = router;
