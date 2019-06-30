const Model = require('../models');
const {
  verifyPassword,
  generateToken
} = require('../helpers');

class User {
  static register(req, res, next) {
    let userObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
      email: req.body.email,
      password: req.body.password
    }

    Model.User.create(userObj)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }

  static login(req, res, next) {
    Model.User.find({
        email: req.body.email
      })
      .then((response) => {
        if (response.length == 0) {
          next({
            code: 401
          })
        } else {
          if (verifyPassword(req.body.password, response[0].password)) {
            res.status(201).json({
              access_token: generateToken({
                _id: response[0]._id,
                email: response[0].email,
                role: response[0].role,
                firstName: response[0].firstName,
                lastName: response[0].lastName
              }),
              user: {
                _id: response[0]._id,
                email: response[0].email,
                role: response[0].role,
                firstName: response[0].firstName,
                lastName: response[0].lastName
              }
            });
          } else {
            next({
              code: 401
            });
          }
        }
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = User;