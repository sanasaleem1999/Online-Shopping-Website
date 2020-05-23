const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    }, 

    brand: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

   
    benefits: {
         type: String,
         required: true,
     },

     image: {
         type: String,
     }


})

module.exports = mongoose.model('Product', productSchema);