const userService = require('../models/userService');
const ejsHelper = require('../views/helpers/helper');
var userController = {}

userController.listUser = async function (req, res, next) {
    const users = await userService.queryAllUsers(req, res);
    //console.log(users);
    res.render('pages/tables', { title: 'List User', name: 'List User', users : users, listUser : ejsHelper.listUsers });
}

userController.detailUser = async (req, res) => {
    const queryDetail = null;
    res.render('user/detail', {
        relate: null,
        detail: queryDetail
    });
}

module.exports = userController;