var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    items: {type: Array, "default": []},
    payment: {type: Array, "default": []},
    shipping: {type: Array, "default": []},
    orderDate: {type: Date, required: true}
}, {
    usePushEach: true
});

module.exports = mongoose.model('Order', schema);