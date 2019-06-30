const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  image: {
    type: String,
    required: [true, 'image is required']
  },
  price: {
    type: Number,
    min: [0, 'Price cannot below 0'],
    required: [true, 'stock is required']
  },
  stock: {
    type: Number,
    min: [0, 'Stock cannot below 0'],
    required: [true, 'stock is required']
  }
});

let productModel = mongoose.model('Product', productSchema);

module.exports = productModel;