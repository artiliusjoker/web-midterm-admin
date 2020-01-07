const ejsHelper = require('../views/helpers/helper');
const productService = require('../models/productService');
const productViewService = require('../models/productViewService');

var productController = {};

productController.getProductList = async (req, res, next) => {
    const query = await productService.getQueryObject(req.query);
    const totalItems = await productService.productCount(query);
    const queryOption = {
        page: productViewService.getPageOption({
            itemPerPage: 12,
            currentPage: req.query['page'] ? parseInt(req.query['page']) : 1,
            totalItems: totalItems,
            url: req.baseUrl + req.path,
            queryParams: req.query
        })
    }

    // get products
    const products = await productService.getProducts(query, queryOption.page);

    const viewModel = {
        products: productViewService.getProductListViewModel(products),
        pageOptions: queryOption.page,
    }
    res.render('pages/product/list', { title: 'Products', name: 'Products List', viewModel });
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
