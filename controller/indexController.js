const validate = require('../config/validate');
const adminService = require('../models/adminService');
var indexController = {};

indexController.login = (req, res) => {
	res.render('pages/login_register/login', { title: 'Sign In', layout: 'layout_a' });
};

indexController.postLogin = (req, res) => {
	res.redirect('/admin');
};

indexController.reset = (req, res) => {
	res.render('pages/login_register/forgot', { title: 'Reset password', layout: 'layout_a' });
};

indexController.postReset = async (req, res) => {
	res.redirect('/forgot-password');
};

indexController.register = (req, res) => {
	res.render('pages/login_register/register', { title: 'Register', layout: 'layout_a' });
};

indexController.postRegister = async (req, res) => {
	const check = await adminService.createAdmin(req.body);
	if(check.result) res.redirect('/');
	else res.redirect('/register');
};

indexController.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}

module.exports = indexController;
