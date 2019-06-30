const Model = require('../models');

class Cart {

  static readAll(req, res, next) {

    Model.Cart.find({userId: req.params.userId})
      .populate('productId')
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }

  static create(req, res, next) {
    let cartObj = {
      productId: req.body.productId,
      userId: req.body.userId,
      quantity: 1
    }

    Model.Cart.create(cartObj)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      });
  }

  static delete(req, res, next) {
    Model.Cart.deleteOne({
        _id: req.params.cartId
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = Cart