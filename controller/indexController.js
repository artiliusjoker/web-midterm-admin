const validate = require('../config/validate');
const adminService = require('../models/adminService');
const passport = require('passport');
var indexController = {};

indexController.login = (req, res) => {
	if(validate.isLoggedIn(req))
	{
		res.redirect('/admin');
		return;
	}
	res.render('pages/login_register/login', { title: 'Sign In', layout: 'layout_a' });
};

indexController.postLogin = (req, res, next) => {
	if(validate.isLoggedIn(req))
	{
		res.redirect('/admin');
		return;
	}
	passport.authenticate('local', function (err, user, message) {
        if (err) {
            return next(err);
        }
        if (!user || err) {
			req.flash("error", message.errors);
            return res.redirect('/');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin');
        });
    })(req, res, next);
};

indexController.reset = (req, res) => {
	if(validate.isLoggedIn(req))
	{
		res.redirect('/admin');
		return;
	}
	res.render('pages/login_register/forgot', { title: 'Reset password', layout: 'layout_a' });
};

indexController.postReset = async (req, res) => {
	if(validate.isLoggedIn(req))
	{
		res.redirect('/admin');
		return;
	}
	res.redirect('/forgot-password');
};

indexController.register = (req, res) => {
	if(validate.isLoggedIn(req))
	{
		res.redirect('/admin');
		return;
	}
	res.render('pages/login_register/register', { title: 'Register', layout: 'layout_a' });
};

indexController.postRegister = async (req, res) => {
	if(validate.isLoggedIn(req))
	{
		res.redirect('/admin');
		return;
	}
	const check = await adminService.createAdmin(req.body);
	if(check.result){
		req.flash('success', check.message);
		res.redirect('/');
	}
	else {
		req.flash('error', check.message);
		res.redirect('/register');
	};
};

indexController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = indexController;
