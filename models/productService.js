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
        quantity: body.quantity,
        description: body.description,
        price: body.price
    });

    await Promise.all([
        ...Object.keys(newProductMetaData).map(key => new Promise(async (resolve, reject) => {
            try {
                const ref = await models[key].findOne({ key: newProductMetaData[key] });
                if (key === 'color' || key === 'size') {
                    newProduct['option'][key].push(ref._id);
                }
                else newProduct[key] = ref._id;
            } catch (error) {
                reject('Không tạo được sản phẩm');
            }
            resolve('Thành công');
        }))
    ])

    files.forEach(file => {
        const dUri = new Datauri();
        dUri.format(path.extname(file.originalname).toString(), file.buffer);
        cloudinary.uploader.upload(dUri.content, { public_id: `product/${newProduct._id}` })
        .then(result => {
            newProduct['assert'][img].push(result.url);
            console.log(result.url);
        })
    })

    await newProduct.save();
    return {
        type: 'success',
        message: 'Tạo sản phẩm thành công !'
    }
}