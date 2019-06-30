const bcrypt = require('bcryptjs');

module.exports = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}