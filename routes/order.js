const express = require('express');
const router = express.Router();
const controller = require('../controller/orderController');
const checkLoggedIn = require('../controller/adminController').checkLoggedIn;

router.get('*', checkLoggedIn);

router.get('/', controller.getListOrder);

router.get('/list', controller.getListOrder);

router.post('/:id', controller.postStatus);

router.get('/:id', controller.getListOrder);

module.exports = router;