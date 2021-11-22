const express = require("express");
const router = express.Router();

// Get all routes
router.get("/", (req, res) => {
  res.send("search: get all routes");
});

module.exports = router;
