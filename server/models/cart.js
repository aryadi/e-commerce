const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartSchema = mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'product id is required'],
    ref: 'Product'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
    ref: 'User'
  },
  quantity: {
    type: Number,
    min: [1, 'quantity cannot be less than 1']
  }
});

let cartModel = mongoose.model('Cart', cartSchema);

module.exports = cartModel;