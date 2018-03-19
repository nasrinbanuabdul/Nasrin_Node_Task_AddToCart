const mongoose = require('mongoose');

let cart = mongoose.Schema({

    userid: {
        type: Number,
    },
    productName: {
        type: String,
        required: [true, 'Why no ']
    },
    price: {
        type: Number,
         required: [true, 'Why no ']
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    inTheBox: {
        type: String
    },
    modelNumber: {
        type: String
    },
    size: {
        type: String
    },
    category: {
        type: String,
        required: [true, 'Why no ']
    },
    color: {
        type: String
    },
    image: {
        type: String,
         required: [true, 'Why no ']
    },
    cartFlag: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('cartProducts', cart);
//var cartModel=module.exports;