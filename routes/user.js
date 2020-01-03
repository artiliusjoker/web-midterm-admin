const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const check = require('../controller/adminController').checkLoggedIn;

router.get('*', check);

router.get('/', controller.test);

router.get('/list', controller.listUser);

router.get('/:id', controller.getDetails);

router.post('/:id', controller.updateDetails);

module.exports = router;