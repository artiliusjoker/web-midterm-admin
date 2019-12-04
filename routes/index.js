var express = require('express');
var router = express.Router();
var indexController = require('../controller/indexController');

/* Default page : Login, Reset and Register */
router.get('/', indexController.login);
router.post('/', indexController.postLogin);

router.get('/forgot-password', indexController.reset);
router.post('/forgot-password', indexController.postReset);

router.get('/register', indexController.register);
router.post('/register', indexController.postRegister);

// Not found page
//router.get('/*', indexController.notFound);

module.exports = router;
