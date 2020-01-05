const validate = require('../config/validate');
const adminService = require('../models/adminService');
const ejsHelper = require('../views/helpers/helper');
var adminController = {}

adminController.checkLoggedIn = function (req, res, next) {
   if(validate.isLoggedIn(req)) return next();
    else res.redirect('/');
};

adminController.dashboard = function (req, res, next) {
    res.render('index', { title: 'Dashboard', name: 'Overview' });
}

adminController.getProfile = (req, res, next) => {
    res.render('pages/admin/profile', { title: 'Profile', name: `${req.user.fullname}` });
}

adminController.postProfile = async (req, res, next) => {
    const check = await adminService.updateAdmin(req.user.username, req.body);
    req.flash(check.type, check.message);
    res.redirect('/admin/profile');
    //res.render('pages/admin/profile', { title: 'Profile', name: `${req.user.fullname}` });
}

adminController.listAdmin = async function (req, res, next) {
    const admins = await adminService.queryAll();
    res.render('pages/admin/list', { title: 'List admin', name: 'Admin List', admins : admins, listAdmin : ejsHelper.listAdmin });
}

adminController.getDetails = async (req, res, next) => {
    const admin = await adminService.querryDetail(req, res);
    if(!admin)
    {
        res.render('pages/admin/profile', { title: 'Admin profile', name: 'Profile', detail: 'null' });
    }
    else res.render('pages/user/profile', { title: 'Admin profile', name: 'Profile', detail : admin });
}

adminController.charts = function (req, res, next) {
    res.render('pages/charts', { title: 'Charts Statistics', name: 'Charts' });
}

adminController.tables = function (req, res, next) {
    res.render('pages/tables', { title: 'Tables Statistics', name: 'Tables' });
}

adminController.update = function (req, res, next) {
    res.render('pages/update_user', { title: 'Update Info', name: 'Update' });
}

adminController.doanhso = function (req, res, next) {
    res.render('pages/thongke_doanhso', { title: 'Total money', name: 'Money Statistics' });
}

adminController.donhang = function (req, res, next) {
    res.render('pages/quanly_donhang', { title: 'Don hang', name: 'Quan ly don hang'});
}

adminController.sanpham = function (req, res, next) {
    res.render('pages/thongke_soluong', { title: 'Total Goods Sold', name: 'Number of Goods Statistics' });
}

adminController.notFound = (req, res) => {
	res.render('pages/404', { title: '404 Not found', name: '404'});
};

module.exports = adminController;