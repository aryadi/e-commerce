const route = require('express').Router();
const userController = require('../controllers').user;

route.post('/register', userController.register);
route.post('/login', userController.login);

module.exports = route;