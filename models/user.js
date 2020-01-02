const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone: String,
    email: String,
    name: String,
    dob: Date,
    avatar: String,
    status: {
        type: String,
        enum: ['active', 'banned', 'deleted', 'inactive'],
        default: 'active'
    },
    order: [{
        status: String,
        date: Date,
        items: [{
            item_id: String,
            quantity: Number,
            price: Number
        }],
        total_price: Number
    }],
    active: Boolean,
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserSchema, 'user');