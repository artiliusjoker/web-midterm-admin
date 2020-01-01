const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const check = require('../controller/adminController').checkLoggedIn;

router.get('*', check);

router.get('/', controller.listUser);

router.get('/list', controller.listUser);

router.get('/:id', check);

router.post('/:id', check);

module.exports = router;