var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/login_register/login', { title: 'Overview', layout: 'layout_a' });
});
router.get('/admin', function (req, res, next) {
  res.render('index', { title: 'Overview' });
});
router.get('/charts', function (req, res, next) {
  res.render('pages/charts', { title: 'Overview' });
});
router.get('/tables', function (req, res, next) {
  res.render('pages/tables', { title: 'Overview' });
});
router.get('/register', function (req, res, next) {
  res.render('pages/login_register/register', { title: 'Overview', layout: 'layout_a' });
});
router.get('/forgot-password', function (req, res, next) {
  res.render('pages/login_register/forgot', { title: 'Overview', layout: 'layout_a' });
});
module.exports = router;
