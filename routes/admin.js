var express = require('express');
var router = express.Router();
const controller = require('../controller/adminController');
/* GET users listing. */

router.get('*', controller.checkLoggedIn);

router.get('/', controller.dashboard);

router.get('/dashboard', controller.dashboard);

router.get('/profile', controller.getProfile);

router.post('/profile', controller.postProfile);

router.get('/list', controller.listAdmin);

router.get('/detail/:id', controller.getAdminDetail);

router.post('/detail/:id', controller.postAdminDetail);

router.get('/add', controller.getAddAdmin);

router.post('/add', controller.postAddAdmin);

router.get('/charts', controller.charts);

router.get('/update', controller.update);

router.get('/doanhso', controller.doanhso);

router.get('/soluong-sanpham', controller.sanpham);

router.get('/quanly-donhang', controller.donhang);

// Not found page
router.get('/*', controller.notFound);

module.exports = router;
