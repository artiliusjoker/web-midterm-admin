const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    email: String,
    name: String,
    dob: Date,
    avatar: String,
    address: String,
    status: {
        type: String,
        enum: ['active', 'banned', 'deleted', 'inactive'],
        default: 'inactive'
    },
    shippingAddress: [{
        name: String,
        address: String,
        phone: String
    }],

}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema, 'user');