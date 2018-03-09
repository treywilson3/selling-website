var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    cartItems: [{type: Schema.Types.ObjectId, ref: 'Cart'}],
    boughtItems: [{type: Schema.Types.ObjectId, ref: 'Bought'}],
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
},{
    usePushEach: true
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);