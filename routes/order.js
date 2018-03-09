var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Order = require('../models/order');
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
        for (var index = 0; index < req.body.items.length; ++index) {
            Item.findByIdAndUpdate(req.body.items[index].itemId, {active: false}, function (err, user) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
            });
        }
        var order = new Order({
            items: req.body.items,
            payment: req.body.payment,
            shipping: req.body.shipping,
            tracking: req.body.tracking,
            orderDate: req.body.orderDate
        });
        order.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.orders.push(result);
            user.set({cartItems: []});
            user.save();
            res.status(201).json({
                message: 'Checkout Complete',
                obj: result
            });
        });
    });
});

router.get('/:id', function (req, res, next) {
    User.findById(req.params.id)
        .populate('orders')
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