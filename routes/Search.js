const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
require("dotenv").config();

// Responds with json of best match
// {url, tags, score} form
// limit of 5
router.get("/", async (req, res) => {
  await connectToMongo();
  const db = mongoose.connection;
  const q = await Gif.aggregate([
    {
      $search: {
        index: "tags",
        text: {
          query: req.query.tags.toLowerCase(),
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
  console.log(q);
  if (q.length === 0) {
    res.send({}); // empty json response if no matching tags
  } else {
    res.send(q[0]); // respond with top search result only
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};

module.exports = router;
