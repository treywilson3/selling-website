var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Bought = require('../models/bought');
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
        Item.findByIdAndUpdate(req.body.itemId, {active: false}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
        });
        var bought = new Bought({
            itemName: req.body.itemName,
            sellerId: req.body.sellerId,
            sellerUsername: req.body.sellerUsername,
            price: req.body.price,
            itemInformation: req.body.itemInformation,
            image: req.body.image,
            itemId: req.body.itemId,
            boughtDate: req.body.boughtDate
        });
        bought.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.boughtItems.push(result);
            user.cartItems.pull({_id: req.body.cartId});
            user.save();
            res.status(201).json({
                message: 'Item Bought',
                obj: result
            });
        });
    });
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .populate('boughtItems')
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

module.exports = router;