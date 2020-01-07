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