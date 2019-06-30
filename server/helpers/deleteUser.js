const {User} = require('../models');

module.exports = function() {
  if (process.env.NODE_ENV === 'test') {
    User
      .deleteMany({})
      .then(function() {
        console.log('User collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}