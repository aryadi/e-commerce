const jwt = require('jsonwebtoken');

module.exports = (token) => {
  let decode = jwt.verify(token, process.env.TOKEN_SECRET);
  return decode;
}