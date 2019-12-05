const validate = require('../config/validate');
var indexController = {};

indexController.checkLoggedIn = function (req, res, next) {
	if(validate.isLoggedIn(req, res, next)) res.redirect('/admin');
	 else return next();
 };

indexController.login = (req, res) => {
	res.render('pages/login_register/login', { title: 'Sign In', layout: 'layout_a' });
};

indexController.postLogin = (req, res) => {
	res.redirect('/admin');
};

indexController.reset = (req, res) => {
	res.render('pages/login_register/forgot', { title: 'Reset password', layout: 'layout_a' });
};

indexController.postReset = (req, res) => {
	res.redirect('/forgot-password');
};

indexController.register = (req, res) => {
	res.render('pages/login_register/register', { title: 'Register', layout: 'layout_a' });
};

indexController.postRegister = (req, res) => {
	res.redirect('/register');
};

indexController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = indexController;
