const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const check = require('../controller/adminController').checkLoggedIn;

router.get('*', check);

router.get('/', controller.listUser);

router.get('/list', controller.checkLoggedIn);

router.get('/:id', controller.checkLoggedIn);

router.post('/:id', controller.checkLoggedIn);

module.exports = router;