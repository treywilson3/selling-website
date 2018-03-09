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
        active: {type: Boolean, required: true},
        itemId: {type: String, required: true},
},{
    usePushEach: true
});

schema.pre('remove', function(next) {
    User.update({cartItems: this._id}, {"$pull": { "cartItems": this._id}}, {"multi": true})
    .exec();
    next();
});

module.exports = mongoose.model('Cart', schema);