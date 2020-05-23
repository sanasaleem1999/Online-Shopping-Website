const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
 },

  date: {
      type: String
  },

  email: {
      type: String,
      unique: true,
  }
})

module.exports = mongoose.model('Order', orderSchema)