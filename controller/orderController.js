const orderService = require('../models/orderService');
const ejsHelper = require('../views/helpers/helper');

let orderController = {}

orderController.getListOrder = async (req, res, next) => {
    const orders = await orderService.listAllOrder();
    res.render('pages/order/list', { title: 'Đơn hàng', name: 'Danh sách đơn hàng', orders: orders, statusHelper: ejsHelper.createStatusLabel });
}

orderController.postStatus = async (req, res, next) => {
    const result = await orderService.changeStatus(req.params.id, req.body);
    res.send(result);
}

module.exports = orderController;