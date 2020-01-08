const ejsHelper = require('../views/helpers/helper');
const productService = require('../models/productService');
const productViewService = require('../models/productViewService');

var productController = {};

productController.getProductList = async (req, res, next) => {
    const query = await productService.getQueryObject(req.query);
    const totalItems = await productService.productCount(query);
    
    const sortOption = productViewService.getSortOption({query: req.query});
    const fitlerOptionsData = await productService.getFilterOptionsData();
    const filterOptions = await productViewService.getFilterOptions({query: req.query, data: fitlerOptionsData});

    const queryOption = {
        sort: productService.getSortQueryObject(sortOption.selected),
        page: productViewService.getPageOption({
            itemPerPage: 5,
            currentPage: req.query['page'] ? parseInt(req.query['page']) : 1,
            totalItems: totalItems,
            url: req.baseUrl + req.path,
            queryParams: req.query
        })
    }

    // get products
    const products = await productService.getProducts(query, queryOption);

    const viewModel = {
        products: productViewService.getProductListViewModel(products),
        pageOptions: queryOption.page,
        pageHelper: ejsHelper,
        sortOption,
        filterOptions
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

productController.deleteProduct = async (req, res, next) => {
    const result = await productService.deleteProduct(req.params.id);
    res.send(result);
}

productController.getDetailProduct = async (req, res, next) => {
    res.render('pages/product/detail');
}

productController.postDetailProduct = async (req, res, next) => {
    res.redirect(`/product/${req.params.id}`)
}

module.exports = productController;
