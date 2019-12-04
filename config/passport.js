const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Admin = require("../models/admin");

passport.use(new LocalStrategy({
	usernameField: 'user[email]',
	passwordField: 'user[password]',
}, (email, password, done) => {
	Admin.findOne({ email : email }, function(err, user){
		if(err) return done(err);
		if(!user){
			return done(null, false, {errors : "Incorrect email."});
		}
		if(!user.validatePassword(password)){
			return done(null, false, {errors : "Incorrect password"});
		}
		return done(null, user);
	});
});