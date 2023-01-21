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
  const searchQuery = await Gif.aggregate([
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
  if (searchQuery.length === 0) {
    // empty json response if no matching tags
    res.send({});
  } else {
    // respond with top search result only
    res.send(searchQuery[0]);
    // update top result with timestamp + points
    const filter = { url: searchQuery[0].url };
    const update = {
      date: new Date().toUTCString(),
      $inc: { points: 5 },
    };

    let doc = await Gif.findOneAndUpdate(filter, update, {
      new: true,
    });
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};

module.exports = router;
