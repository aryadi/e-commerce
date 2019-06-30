const route = require('express').Router();
const cartModel = require('../controllers').cart;
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorizationUser');

route.get('/:userId', authentication, authorization, cartModel.readAll);
route.post('/', authentication, authorization, cartModel.create);
route.patch('/:userId', authentication, authorization, cartModel.create);
route.delete('/:cartId', authentication, authorization, cartModel.delete);

module.exports = route;