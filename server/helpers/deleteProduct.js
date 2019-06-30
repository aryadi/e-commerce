const {Product} = require('../models');

module.exports = function() {
  if (process.env.NODE_ENV === 'test') {
    Product
      .deleteMany({})
      .then(function() {
        console.log('Product collection cleared!');
      })
      .catch(function(err) {
        console.log(err);
      });
  }
}