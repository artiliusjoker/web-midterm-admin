const ejsHelper = require('../views/helpers/helper');
var productController = {};

productController.getProductList = (req, res, next) => {
    res.render('pages/user/test', { title: 'Products', name: 'Products List' });
}

module.exports = productController;