const userService = require('../models/userService');
const ejsHelper = require('../views/helpers/helper');
var userController = {}

userController.listUser = async function (req, res, next) {
    const users = await userService.queryAllUsers(req, res);
    res.render('pages/tables', { title: 'List User', name: 'List User', users : users, listUser : ejsHelper.listUsers });
}

userController.getDetails = async (req, res, next) => {
    const user = await userService.querryDetail(req, res);
    res.render('pages/user/profile', { title: 'User profile', name: 'Profile', detail : user  });
}

userController.updateDetails = async (req, res, next) => {
    res.render('pages/user/detail', { title: 'User detail', name: 'Detail' });
}

userController.test = (req, res, next) => {
    res.render('pages/user/profile', { title: 'User profile', name: 'Profile' });
}

module.exports = userController;