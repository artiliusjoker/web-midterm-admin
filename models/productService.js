const { Product, Gender, Brand, Category, Group, ColorOption, SizeOption } = require('./productModel');

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