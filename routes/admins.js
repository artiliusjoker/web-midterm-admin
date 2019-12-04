var express = require('express');
var router = express.Router();
const controller = require('../controller/adminController');
/* GET users listing. */

router.get('*', controller.checkLoggedIn);

router.get('/dashboard', controller.dashboard);

router.get('/charts', controller.charts);

router.get('/tables', controller.tables);

router.get('/update', controller.update);

router.get('/doanhso', controller.doanhso);

router.get('/soluong-sanpham', controller.sanpham);

router.get('/quanly-donhang', controller.donhang);

module.exports = router;
