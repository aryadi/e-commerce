const jwt = require('jsonwebtoken');

module.exports = (obj) => {
  return jwt.sign({obj}, process.env.TOKEN_SECRET);
}