var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    itemName: {type: String, required: true},
    sellerId: {type: String, required: true},
    sellerUsername: {type: String, required: true},
    price: {type: String, required: true},
    itemInformation: {type: String, required: true},
    image: {type: String, required: true},
    active: {type: Boolean, required: true}
});

module.exports = mongoose.model('Item', schema);