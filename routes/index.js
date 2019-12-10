var express = require('express');
var router = express.Router();
const indexController = require('../controller/indexController');

/* Default page : Login, Reset and Register */
router.get('/', indexController.login);
router.post('/', indexController.postLogin);

router.get('/forgot-password', indexController.reset);
router.post('/forgot-password', indexController.postReset);

router.get('/register', indexController.register);
router.post('/register', indexController.postRegister);

router.get('/logout', indexController.logout);

module.exports = router;
