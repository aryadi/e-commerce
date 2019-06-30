const {Cart} = require('../models');

module.exports = function() {
  if (process.env.NODE_ENV === 'test') {
    Cart
      .deleteMany({})
      .then(function() {
        console.log('Cart collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}