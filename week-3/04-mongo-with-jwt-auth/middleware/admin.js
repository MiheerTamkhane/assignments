// Middleware for handling auth
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  const words = token.split(" ");
  const singleWord = words[1];
  const decode = jwt.verify(singleWord, JWT_SECRET);
  if (decode.username) {
    next();
  } else {
    res.json({
      msg: "You are not authenticated.",
    });
  }
}

module.exports = adminMiddleware;
