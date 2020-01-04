const mongoose = require('mongoose');
const {Schema} = mongoose;

const adminSchema = new Schema({
	email: String,
	username: String,
	password: String,
	fullname: String,
	phone: String,
	birthday: Date,
	avatar: String,
	address: {
		type : String,
		default : 'Ho Chi Minh University of Science'
	},
	role: {
		type : String,
		enum : ['normal', 'super', 'editor', 'monitor'],
		default : 'normal'
	},
	status: {
		type : String,
		enum : ['active', 'blocked', 'deleted'],
		default : 'active'
	}
});

module.exports = mongoose.model('admin', adminSchema, 'admin');