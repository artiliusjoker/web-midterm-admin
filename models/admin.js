const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
	username: String,
	password: String,
	email: String,
	fullname: String,
	birthday: Date,
	avatar: String,
	dob: Date,
	address: {
		type: String,
		default: 'Ho Chi Minh University of Science'
	},
	phone: {
		type: String,
		default: 'Chưa có'
	},
	role: {
		type: String,
		enum: ['normal', 'super', 'editor', 'monitor'],
		default: 'normal'
	},
	status: {
		type: String,
		enum: ['active', 'blocked', 'deleted'],
		default: 'active'
	}
})

module.exports = mongoose.model('admin', adminSchema, 'admin');