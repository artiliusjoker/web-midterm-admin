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
            title: title[key],
            list: data[key],
        }
    });
}