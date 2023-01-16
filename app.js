const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Gif = require("./models/Gif");
const isValidKey = require("./auth");
require("dotenv").config();

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("GET: default route");
});

app.post("/new", async (req, res) => {
  if (isValidKey(req)) {
    await connectToMongo();
    const db = mongoose.connection;
    const newGif = new Gif(req.body);
    const savedGif = await newGif.save();
    res.json(savedGif);
  }
  res.json("Invalid key provided.");
});
const SearchRoute = require("./routes/Search");
const RandomRoute = require("./routes/Random");
const CountRoute = require("./routes/Count");
const AllRoute = require("./routes/All");
const TagsRoute = require("./routes/Tags");

app.use("/search", SearchRoute);
app.use("/random", RandomRoute);
app.use("/count", CountRoute);
app.use("/all", AllRoute);
app.use("/tags", TagsRoute);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));

const connectToMongo = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  return mongoose;
};
