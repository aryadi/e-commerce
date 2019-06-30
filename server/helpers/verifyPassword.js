const bcrypt = require('bcryptjs');

module.exports = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}