const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
	email: String,
	username: String,
	password: String,
	fullname: String,
	phone: String,
	birthday: Date,
	avatar: String
});

module.exports = mongoose.model('admin', adminSchema, 'admin');