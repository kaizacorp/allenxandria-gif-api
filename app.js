const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const Gif = require("./models/Gif");

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("default route");
});

const SearchRoute = require("./routes/Search");
const RandomRoute = require("./routes/Random");

app.use("/search", SearchRoute);
app.use("/random", RandomRoute);

// Starting server
app.listen(3000, console.log("Listening on port 3000"));
