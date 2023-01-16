require("dotenv").config();

module.exports = function isValidKey(req) {
  if (req.query.key && req.query.key === `${process.env.API_KEY}`) {
    return true;
  }
  return false;
};
