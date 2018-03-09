var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    itemName: {type: String, required: true},
    sellerId: {type: String, required: true},
    sellerUsername: {type: String, required: true},
    price: {type: String, required: true},
    itemInformation: {type: String, required: true},
    image: {type: String, required: true},
    itemId: {type: String, required: true},
    boughtDate: {type: Date, required: true}
},{
    usePushEach: true
});

module.exports = mongoose.model('Bought', schema);