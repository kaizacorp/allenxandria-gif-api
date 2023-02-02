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

// Responds with json of best match
// {url, tags, score} form
router.get("/", async (req, res) => {
  const LIMIT = 5;
  const POINTS = 5;

  await connectToMongo();
  const db = mongoose.connection;
  // top search result only
  const [searchQuery] = await Gif.aggregate([
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
    { $limit: LIMIT },
    {
      $project: {
        _id: 0,
        url: 1,
        tags: 1,
        date: 1,
        points: 1,
        score: { $meta: "searchScore" },
      },
    },
  ]);
  if (!searchQuery) {
    // empty json response if no matching tags
    res.send({});
  } else {
    res.send(searchQuery);
    // update top result with timestamp + points
    const filter = { url: searchQuery.url };
    const update = {
      date: new Date().toUTCString(),
      $inc: { points: POINTS },
    };

    let doc = await Gif.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
});

module.exports = router;
