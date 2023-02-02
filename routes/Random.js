const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
const isValidKey = require("../auth");
require("dotenv").config();

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};

// Responds with random Allen gif(s)
router.get("/", async (req, res) => {
  if (!isValidKey(req, `${process.env.ACCESS_KEY}`)) {
    res.json("Invalid key provided.");
    return;
  }

  await connectToMongo();
  const db = mongoose.connection;

  let count = Number(req.query.count);

  if (count < 0) {
    count = 0;
  }
  if (count > 10) {
    count = 10;
  }
  if (count && count > 0) {
    const randomGifs = await Gif.aggregate([{ $sample: { size: count } }]);
    res.send(randomGifs);
    return;
  }

  const [singleRandomGif] = await Gif.aggregate([{ $sample: { size: 1 } }]);
  res.send(singleRandomGif);
  // update timestamp + points
  const filter = { url: singleRandomGif.url };
  const update = {
    date: new Date().toUTCString(),
    $inc: { points: 1 },
  };

  let doc = await Gif.findOneAndUpdate(filter, update, {
    new: true,
  });
});

module.exports = router;
