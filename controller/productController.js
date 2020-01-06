const ejsHelper = require('../views/helpers/helper');
var productController = {};

productController.getProductList = (req, res, next) => {
    res.render('pages/product/list', { title: 'Products', name: 'Products List' });
}

productController.getProductAdd = (req, res, next) => {
    res.render('pages/product/add', { title: 'Add product', name: 'Product/Add' });
}

productController.postProductAdd = (req, res, next) => {
    res.render('pages/product/list', { title: 'Products', name: 'Products List' });
}

module.exports = productController;
