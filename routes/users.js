var express = require('express');
var router = express.Router();
var cart = require('../model/cartModel');
var errorHelper = require('mongoose-error-helper').errorHelper;

router.get('/api/ProducList', function (req, res) {
    cart.find({}, function (err, users) { 
        res.send(JSON.stringify(users));
    });

});

router.post('/api/addToCart', function (req, res, next) {
    var cartDetails = new cart({

        userid: req.body.userid,
        productName: req.body.productName,
        price: req.body.price,
        quantity: req.body.quantity,
        inTheBox: req.body.inTheBox,
        modelNumber: req.body.modelNumber,
        size: req.body.size,
        category: req.body.category,
        color: req.body.color,
        image: req.body.image
    });
    cartDetails.cartFlag = 1;
    cart.findByIdAndUpdate(
        req.body._id,
        req.body,
        { runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        (err, cartList) => {
            if (err) return errorHelper(err, next);
            var successmessage = "Product Added Successfully to the Cart";
            return res.status(200).send({ Product: JSON.stringify(cartList), successmessage });
        }

    )

});
module.exports = router;