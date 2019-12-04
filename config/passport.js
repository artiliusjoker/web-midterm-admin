const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const adminService = require('../models/adminService');

passport.use(new LocalStrategy(
	(username, password, done) => {
		adminService.findByUname(username, function (err, user) {
			if (err) return done(err);
			if (!user) {
				return done(null, false, { errors: "Incorrect username." });
			}
			adminService.validatePass(password, user.password, function (err, res) {
				//if (err) throw err;
				if (res) return done(null, user);
				else return done(null, false, { errors: "Incorrect password" });
			});
		});
	}));

// Passport local setup
passport.serializeUser(function (user, done) {
	done(null, user.username);
});

passport.deserializeUser(function (username, done) {
	adminService.findByUname(username, function (err, user) {
		done(null, user);
	});
});