const { Product, Gender, Brand, Category, Group, ColorOption, SizeOption } = require('./productModel');
const cloudinary = require('../config/cloudinary');
const Datauri = require('datauri');
const path = require('path');

exports.getDataOfProduct = async () => {
    const result = {};
    const models = {
        gender: Gender,
        brand: Brand,
        category: Category,
        group: Group,
        color: ColorOption,
        size: SizeOption
    }

    await Promise.all([
        ...Object.keys(models).map(key =>
            new Promise(async (resolve, reject) => {
                result[key] = await models[key].find();
                resolve();
            })
        )])
    return result;
}

exports.saveNewProduct = async (body, files) => {
    const soluong = parseInt(body.quantity);
    const giathanh = parseInt(body.price);

    if (isNaN(soluong) || isNaN(giathanh)) {
        return {
            type: 'error',
            message: 'Không nhập đúng kiểu dữ liệu của sản phẩm'
        }
    }

    const models = {
        gender: Gender,
        brand: Brand,
        category: Category,
        group: Group,
        color: ColorOption,
        size: SizeOption
    }
    const { gender, brand, category, group, color, size } = body;
    const newProductMetaData = { gender, brand, category, group, color, size };

    const newProduct = new Product({
        name: body.name,
        quantity: soluong,
        description: body.description,
        price: giathanh
    });

    await Promise.all([
        ...Object.keys(newProductMetaData).map(key => new Promise(async (resolve, reject) => {
            try {
                if (key === 'color' || key === 'size') {
                    const myArray = new Array(newProductMetaData[key]);
                    myArray.forEach(async optionData => {
                        const ref = await models[key].findOne({ key: optionData });
                        newProduct['option'][key].push(ref._id);
                    })
                }
                else {
                    const ref = await models[key].findOne({ key: newProductMetaData[key] });
                    newProduct[key] = ref._id;
                }
            } catch (error) {
                reject('Không tạo được sản phẩm');
            }
            resolve('Thành công');
        }))
    ])

    for (let i = 0; i < files.length; i++) {
        const dUri = new Datauri();
        dUri.format(path.extname(files[i].originalname).toString(), files[i].buffer);
        await cloudinary.uploader.upload(dUri.content, { public_id: `product/${newProduct._id}_${i + 1}` })
            .then(result => {
                newProduct.assert.img.push(result.url);
            })
            .catch(err => {
                console.log(err);
                return {
                    type: 'error',
                    message: 'Đã có lỗi xảy ra khi tạo sản phẩm'
                }
            })
    }

    await newProduct.save();
    return {
        type: 'success',
        message: 'Tạo sản phẩm thành công !'
    }
}

exports.productCount = async (query) => {
    return await Product.countDocuments(query);
}

exports.getProducts = async (query, { page, sort }) => {
    //query
    return (page && sort)
        ?
        await Product.find(query)
            .skip((page.currentPage - 1) * page.itemPerPage)
            .limit(page.itemPerPage)
            .sort(sort)
        :
        await Product.find(query);
}

exports.getQueryObject = async (query) => {
    const result = {};
    const models = {
        gender: Gender,
        brand: Brand,
        category: Category,
        group: Group
    }

    //get all ids
    await Promise.all([
        ...Object.keys(query).map(key =>
            new Promise(async (resolve, reject) => {
                // property not in {gender, brand, ...} => not insert to result
                if (!models[key]) {
                    resolve();
                    return;
                }
                // property in array => query all values
                if (Array.isArray(query[key])) {
                    // query
                    const temp = (await Promise.all([
                        ...query[key].map((value) => new Promise(
                            async (resolve, reject) => {
                                resolve(await models[key].findOne({ key: value }));
                            })
                        )
                    ])).reduce((found, res) => {
                        // map res to id, trunc null element
                        if (res && res._id)
                            found.push(res._id);
                        return found;
                    }, []);
                    result[key] = { "$in": temp };
                }
                else {
                    let temp = await models[key].findOne({ key: query[key] });
                    result[key] = (temp && temp._id) ? temp._id : null;
                }
                resolve();
            })
        )]);
    return result;
}

exports.getSortQueryObject = (option) => {
    const sort = {};
    if (!option)
        return sort;
    const code = parseInt(option);

    switch (code) {
        // price increasing
        case 0:
            sort['price'] = 1;
            break;
        // price descending
        case 1:
            sort['price'] = -1;
            break;
        case 2:
            sort['view'] = -1;
            break;
        case 3:
            sort['sold'] = -1;
            break;
        case 4:
            sort['createdAt'] = -1;
            break;
        case 5:
            sort['rating'] = -1;
            break;
    }
    return sort;
}

exports.getFilterOptionsData = async () => {
    const models = {
        gender: Gender,
        brand: Brand,
        category: Category,
        group: Group
    }
    const result = {};
    await Promise.all([
        ...Object.keys(models).map(key =>
            new Promise(async (resolve, reject) => {
                result[key] = await models[key].find();
                resolve();
            })
        )]);
    return result;
}

exports.deleteProduct = async (id) => {
    let message = 'Xoá sản phẩm thành công',
        status = true;
    try {
        const result = await Product.deleteOne({'_id' : id}, {single : true})
        if(result.deletedCount !== 1)
        {
            message = 'Đã có lỗi trong việc xóa sản phẩm',
            status = false;
        }
    } catch (error) {
        status = false;
        message = 'Đã có lỗi phát sinh, không thể xoá !';
    }
    return {
        status,
        message
    }
}