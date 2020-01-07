module.exports.wrapData = async (data) => {
    const title = {
        gender: 'Giới tính',
        brand: 'Thương hiệu',
        category: 'Danh mục',
        group: 'Loại',
        color: 'Màu sắc',
        size: 'Kích cỡ'
    }

    return Object.keys(title).map(key => {
        return {
            query : key,
            title: title[key],
            list: data[key],
        }
    });
}

module.exports.getProductListViewModel = (products) => {
    const productsViewModel = products.map(item => ({
        imgpath: item.assert.img[0],
        description: item.description,
        name: item.name,
        price: item.price,
        title: item.name.length > 20 ? item.name.substr(0, 19) + '...' : item.name,
        id: item._id
    }));
    return productsViewModel;
}

module.exports.getPageOption = ({ itemPerPage, currentPage, totalItems, url, queryParams }) => {
    return {
        itemPerPage,
        currentPage,
        totalItems,
        url,
        queryParams
    }
}

module.exports.getSortOption = ({ query }) => {
    const option = new function () {
        this.queryString = 'sort',
            this.list = [{
                key: '0',
                name: 'Sắp xếp theo giá tăng dần'
            }, {
                key: '1',
                name: 'Sắp xếp theo giá giảm dần'
            }, {
                key: '2',
                name: 'Sản phẩm phổ biến'
            }, {
                key: '3',
                name: 'Sản phẩm bán chạy'
            }, {
                key: '4',
                name: 'Sản phẩm mới'
            }, {
                key: '5',
                name: 'Sản phẩm yêu thích'
            }
            ]
        this.selected = query[this.queryString];
    };
    return option;
}

module.exports.getFilterOptions = async ({ query, data }) => {
    const title = {
        gender: 'Giới tính',
        brand: 'Thương hiệu',
        category: 'Danh mục',
        group: 'Loại'
    }
    const result = {};
    return Object.keys(title).map(key => {
        return {
            queryString: key,
            title: title[key],
            list: data[key],
            selected: query[key],
        }
    });
}