const LocalStrategy = require('passport-local').Strategy;
const adminService = require('../models/adminService');

module.exports = (passport)  => {
	// Local strategy
	passport.use(new LocalStrategy(
		async (username, password, done) => {
			let user;
			try {
				user = await adminService.findByUname(username);
				if(!user)
					done(null, false, { errors: "Incorrect username." });
			} catch (error) {
				if(err) return done(error);
			}

			if(!await adminService.validatePass(password, user.password)){
				return done(null, false, { errors: "Incorrect password" });
			}
			return done(null, user);
		}
	));
		// Passport local setup
	passport.serializeUser(function (user, done) {
		done(null, user.username);
	});
	passport.deserializeUser(
		async (username, done) => {
			try {
				const user = await adminService.findByUname(username);
				if(!user) {
					return done(null, false, { errors: "Admin not found" });
				}
				done(null, user);
			} catch (error) {
				done(error);
			}
		}
	)
}
