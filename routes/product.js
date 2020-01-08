const express = require('express');
const router = express.Router();
const controller = require('../controller/productController');
const checkLoggedIn = require('../controller/adminController').checkLoggedIn;
const { singleUpload, multiUpload } = require('../models/cloudService');

router.get('*', checkLoggedIn);

router.get('/', controller.getProductList);

router.get('/list', controller.getProductList);

router.get('/add', controller.getProductAdd);

router.post('/add', multiUpload.array('files', 3) ,controller.postProductAdd);

router.get('/:id', controller.getDetailProduct);

router.post(':/id', controller.postDetailProduct);

router.delete('/:id', controller.deleteProduct);

module.exports = router;
