var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Cart = require('../models/cart');
var Item = require('../models/item');

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(req.body.userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var cart = new Cart({
                itemName: req.body.itemName,
                sellerId: req.body.sellerId,
                sellerUsername: req.body.sellerUsername,
                price: req.body.price,
                itemInformation: req.body.itemInformation,
                image: req.body.image,
                active: req.body.active,
                itemId: req.body.itemId
        });
        cart.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.cartItems.push(result);
            user.save();
            res.status(201).json({
                message: 'Item added to cart',
                obj: result
            });
        });
    });
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .populate('cartItems')
        .exec(function (err, items) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: items
            });
        });
});

router.delete('/:id', function (req, res, next) {
    Cart.findById(req.params.id, function (err, cartItem) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        cartItem.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted item from cart',
                obj: result
            });
        });
    });
});

module.exports = router;