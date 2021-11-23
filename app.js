const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const Gif = require("./models/Gif");

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("GET: default route");
});

app.post("/new", async (req, res) => {
  mongoose.connect(
    `mongodb+srv://kaiza:${process.env.PASSWORD}@${process.env.DB_URL}?retryWrites=true&w=majority`
  );
  const db = mongoose.connection;
  const newGif = new Gif(req.body);
  const savedGif = await newGif.save();
  res.json(savedGif);
});
const SearchRoute = require("./routes/Search");
const RandomRoute = require("./routes/Random");

app.use("/search", SearchRoute);
app.use("/random", RandomRoute);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));
