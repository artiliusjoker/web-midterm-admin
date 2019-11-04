var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/charts', function (req, res, next) {
  res.render('pages/charts', { title: 'Overview' });
});
module.exports = router;
