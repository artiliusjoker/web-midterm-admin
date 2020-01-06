const { Product, Gender, Brand, Category, Group, ColorOption, SizeOption } = require('./productModel');
const { config, uploader } = require('../config/cloudinary');
const Datauri = require('datauri');

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
    const dUri = new Datauri();
    const models = {
        gender: Gender,
        brand: Brand,
        category: Category,
        group: Group,
    }
    const { gender, brand, category, group } = body;
    const newProductMetaData = { gender, brand, category, group };
    console.log(newProductMetaData, body);

    const newProduct = new Product({
        name: body.name,
        quantity: body.quantity,
        description: body.description,
        price: body.price,
    });
    await Promise.all([
        ...Object.keys(newProductMetaData).map(key => new Promise(async (resolve, reject) => {
            try {
                const ref = await models[key].findOne({ key: newProductMetaData[key] });
                newProduct[key] = ref._id;
            } catch (error) {
                reject('Không tạo được sản phẩm');
            }
            resolve('Thành công');
        }))
    ])
    await newProduct.save();
    return {
        type: 'success',
        message: 'Tạo sản phẩm thành công !'
    }
}