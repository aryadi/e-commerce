const Model = require('../models');

class Product {
  static create(req, res, next) {
    let productObj = {
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      description: req.body.description,
      stock: req.body.stock
    }

    if (req.file) {
      productObj.image = req.file.gcsUrl;
    }

    Model.Product.create(productObj)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    });
  }

  static readAll(req, res, next) {
    Model.Product.find({})
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    })
  }

  static update(req, res, next) {
    let objproduct = {};

    // console.log(req.file.gcsUrl);
    

    if (req.body.name) {
      objproduct['name'] = req.body.name;
    }

    if (req.body.price) {
      objproduct['price'] = req.body.price;
    }

    if (req.body.description) {
      objproduct['description'] = req.body.description;
    }

    if (req.body.stock) {
      objproduct['stock'] = req.body.stock;
    }

    if (req.file) {
      objproduct['image'] = req.file.gcsUrl;
    }

    Model.Product.updateOne({
        _id: req.params.productId
      }, objproduct)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }

  static delete(req, res, next) {
    
    Model.Product.deleteOne({
        _id: req.params.productId
      })
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = Product;