const ejsHelper = require('../views/helpers/helper');
const productService = require('../models/productService');
const productViewService = require('../models/productViewService');

var productController = {};

productController.getProductList = (req, res, next) => {
    res.render('pages/product/list', { title: 'Products', name: 'Products List' });
}

productController.getProductAdd = async (req, res, next) => {
    const productsMetaData = await productService.getDataOfProduct();
    const wrappedMetaData = await productViewService.wrapData(productsMetaData);
    const viewData = {
        helper: ejsHelper.createDropdown,
        metadata: wrappedMetaData
    }
    res.render('pages/product/add', { title: 'Add product', name: 'Add Product', viewData: viewData });
}

productController.postProductAdd = async (req, res, next) => {
    const result = await productService.saveNewProduct(req.body, req.files);
    req.flash(result.type, result.message);
    res.redirect('/product/add');
}

module.exports = productController;
