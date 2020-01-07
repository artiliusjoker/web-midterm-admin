const {Order} = require('./orderModel');
const User = require('./user');
const service = {};

exports.getDateFormat = (date) => {
    const _date = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${_date}/${month}/${year}, ${hour}:${minute}`;
}

service.listAllOrder = async () => {
    const orders = await Order.find({}, '-items');
    const ordersInfo = [];

    await Promise.all([
        ...orders.map(order => new Promise(async (resolve, reject) => {
            try {
                const owner = await User.findById(order.user);
                ordersInfo.push({
                    id : order._id,
                    owner: owner.name,
                    date: this.getDateFormat(order.createdAt),
                    price: order.totalPrice,
                    status: order.status
                });
            } catch (error) {
                console.log(error);
                reject('Không đọc được dữ liệu !');
            }
            resolve('Tạo thành công');
        }))
    ])
    return ordersInfo;
}

module.exports = service;