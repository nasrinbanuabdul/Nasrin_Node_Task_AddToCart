var express = require('express');
var router = express.Router();
var cart = require('../model/cartModel');
var errorHelper = require('mongoose-error-helper').errorHelper;

router.get('/api/ProducList', function(req, res) {
  cart.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send({Product:userMap});  
  });
});

router.post('/api/addToCart', function (req, res,next) {
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
cartDetails.cartFlag=1;
cart.findByIdAndUpdate(  
    req.body._id,
    req.body,
   {runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true},
    (err, cartList) => {
        if (err) return errorHelper(err, next);
          var successmessage = "Product Added Successfully to the Cart";
        return res.status(200).send({Product:cartList,successmessage});
    }

)

// cart( req.body).validateRequired()
//         .then(function(){
//             return cart.findOneAndUpdate({_id:  req.body._id},req.body,
//                 {runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true})
//                     .then(function(doc) {
//                         res.json({product:doc});
//                     });
//         }, function(err){
//                 global.saveError(err, 'server', req.user);
//                 res.status(500).json(err);
//         });
 
// cart.findById( req.body._id, function (err, cartDetails) {
//   if (err) return handleError(err);

//   cartDetails.set({ cartFlag: 1 });
//   cartDetails.save(function (err, cartDetails) {
//     if (err) return handleError(err);
//     res.send(cartDetails);
//   });
// });


//     if (req.body.id == 0) {
//         cartDetails.save(function (err) {
//             if (err) { throw err; }
//             console.log('added visit');
//    var successmessage = "Product Added Successfully to the Cart";
//             var statusCode = "200";
//             res.status(200).json({ statusCode, successmessage });
//         });
//     } else { // UPDATE
//         var upsertData = cartDetails.toObject();

//         console.log(req.body.id); // OK

//         cart.update({ _id: req.body.id }, upsertData, { multi: false }, function (err) {
//             if (err) { throw err; }
//             console.log('updated visit: ' + req.body.id);
//             var successmessage = "Product Added updated to the Cart";
//             var statusCode = "200";
//             res.status(200).json({ statusCode, successmessage });
//         });
//     }

    // cart.findOne({userid : req.body.userid})
    // .then(doc =>{
    //   if(!doc){
    // return res.status(404).end();  }
    // cartDetails.update((err, data) => {
    // if(data) { 
    // var successmessage = "Product Added Successfully to the Cart";
    // var statusCode = "200";
    // res.status(200).json({ statusCode, successmessage });
    // }
    // else {
    // var errMsg = "Invalid Data";
    // var errCode = "400";
    // res.send(err);
    // res.json({errCode,errMsg});
    // }
    // })

    // })
    // .catch(err => next(err));

});

// router.post('/api/addCart', function (req, res) {
//     var cartDetails = new cart({

//         userid: req.body.userid,
//         productName: req.body.productName,
//         price: req.body.price,
//         quantity: req.body.quantity,
//         inTheBox: req.body.inTheBox,
//         modelNumber: req.body.modelNumber,
//         size: req.body.size,
//         category: req.body.category,
//         color: req.body.color,
//         image: req.body.image
//     });


//     // cart.findOne({userid : req.body.userid})
//     // .then(doc =>{
//     //   if(!doc){
//     // return res.status(404).end();  }
//     // return res.status(200).json(doc);
//     // })
//     // .catch(err => next(err));
//     cartDetails.save((err, data) => {
//         if (data) {
//             var successmessage = "Product Added Successfully to the Cart";
//             var statusCode = "200";
//             res.status(200).json({ statusCode, successmessage });
//         }
//         else {
//             var errMsg = "Invalid Data";
//             var errCode = "400";
//             res.send(err);
//             res.json({ errCode, errMsg });
//         }
//     })
// });

module.exports = router;