require("dotenv").config();

module.exports = function isValidKey(req, secretKey) {
  if (req.query.key && req.query.key === secretKey) {
    return true;
  }
  return false;
};
