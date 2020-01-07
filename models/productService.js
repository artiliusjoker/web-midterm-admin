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

    if(isNaN(soluong) || isNaN(giathanh))
    {
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

    for(let i = 0; i < files.length; i++)
    {
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