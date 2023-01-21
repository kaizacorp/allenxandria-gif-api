const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Gif = require("../models/Gif");
const isValidKey = require("../auth");
require("dotenv").config();

// Responds with random Allen gif(s)
// if count provided will respond with that many
// single gif otherwise
router.get("/", async (req, res) => {
  await connectToMongo();
  const db = mongoose.connection;
  if (isValidKey(req, `${process.env.ACCESS_KEY}`)) {
    let count = Number(req.query.count);
    if (count < 0 || count > 10) {
      count = 10;
    }
    if (count && count > 0) {
      const randomGifs = await Gif.aggregate([{ $sample: { size: count } }]);
      res.send(randomGifs);
    } else {
      const randomGif = await Gif.aggregate([{ $sample: { size: 1 } }]);
      res.send(randomGif[0]);
      // update timestamp + points
      const filter = { url: randomGif[0].url };
      const update = {
        date: new Date().toUTCString(),
        $inc: { points: 1 },
      };

      let doc = await Gif.findOneAndUpdate(filter, update, {
        new: true,
      });
    }
  } else {
    res.json("Invalid key provided.");
  }
});

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
module.exports = router;
