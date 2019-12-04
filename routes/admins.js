var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function (req, res, next) {
  res.render('index', { title: 'Dashboard', name: 'Overview' });
});

router.get('/charts', function (req, res, next) {
  res.render('pages/charts', { title: 'Charts Statistics', name: 'Charts' });
});

router.get('/tables', function (req, res, next) {
  res.render('pages/tables', { title: 'Tables Statistics', name: 'Tables' });
});

router.get('/update', function (req, res, next) {
  res.render('pages/update_user', { title: 'Update Info', name: 'Update'});
});

router.get('/doanhso', function (req, res, next) {
  res.render('pages/thongke_doanhso', { title: 'Total money', name: 'Money Statistics'});
});

router.get('/soluong-sanpham', function (req, res, next) {
  res.render('pages/thongke_soluong', { title: 'Total Goods Sold', name: 'Number of Goods Statistics'});
});

router.get('/quanly-donhang', function (req, res, next) {
  res.render('pages/quanly_donhang', { title: 'Don hang', name: 'Quan ly don hang'});
});

module.exports = router;
