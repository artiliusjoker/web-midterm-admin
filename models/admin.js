const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const saltRound = 10;

const adminSchema = new Schema({
	email: String,
	name: String,
	password: String
});

adminSchema.methods.setPassword = password => {
	bcrypt.hash(password, saltRound, (err, hash) => {
		this.password = hash;
	});
};

module.exports = mongoose.model('admin', adminSchema, 'admin');