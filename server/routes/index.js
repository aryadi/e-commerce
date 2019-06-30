const route = require('express').Router();
const userRoute = require('./user');
const productRoute = require('./product');
const cartRoute = require('./cart');

route.use('/users', userRoute);
route.use('/products', productRoute);
route.use('/carts', cartRoute);

module.exports = route;