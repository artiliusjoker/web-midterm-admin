const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');
const checkLoggedIn = require('../controller/adminController').checkLoggedIn;

router.get('*', checkLoggedIn);

router.get('/', controller.getProductList);

router.get('/add', controller.getProductAdd);

router.post('/add', controller.postProductAdd);

module.exports = router;
