var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Item = require('../models/item');

// router.get('/', function (req, res, next) {
//     Item.find()
//         .exec(function (err, items) {
//             if (err) {
//                 return res.status(500).json({
//                     title: 'An error occurred',
//                     error: err
//                 });
//             }
//             res.status(200).json({
//                 message: 'Success',
//                 obj: items
//             });
//         });
// });
router.get('/', function (req, res, next) {
    Item.find({active:true}, function (err, item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!item) {
            return res.status(401).json({
                title: 'No Items',
                error: {message: 'There are no items for sale'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: item
        });
    });
});

router.get('/:id', function (req, res, next) {
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: item
        });
    });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var item = new Item({
        itemName: req.body.itemName,
        sellerId: req.body.sellerId,
        sellerUsername: req.body.sellerUsername,
        price: req.body.price,
        itemInformation: req.body.itemInformation,
        image: req.body.image,
        active: req.body.active
    });
    item.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Item created',
            obj: result
        });
    });
});

module.exports = router;
