const password = require('passport');
var indexController = {};

indexController.login = (req, res) => {
	res.render('pages/login_register/login', { title: 'Sign In', layout: 'layout_a' });
};

indexController.postLogin = (req, res) => {
	password.authenticate('local')(req, res, function(){
		res.redirect('/');
	});
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

indexController.notFound = (req, res) => {
	res.render('pages/404', { title: '404 Not found', name: '404'});
};

module.exports = indexController;