const userService = require('../models/userService');
const ejsHelper = require('../views/helpers/helper');
var userController = {}

userController.listUser = async function (req, res, next) {
    const users = await userService.queryAllUsers(req, res);
    res.render('pages/tables', { title: 'List User', name: 'List User', users : users, listUser : ejsHelper.listUsers });
}

userController.getDetails = async (req, res, next) => {
    let user;
    try {
        user = await userService.querryDetail(req, res);
    } catch (error) {
        res.render('pages/user/profile', { title: 'User profile', name: 'Profile', detail: 'null' });
    }

    res.render('pages/user/profile', { title: 'User profile', name: 'Profile', detail : user });
}

userController.updateDetails = async (req, res, next) => {
    const check = await userService.updateUser(req.params.id, req.body);
    req.flash(check.type, check.message);
    res.redirect(`/user/${req.params.id}`);
}

userController.test = (req, res, next) => {
    res.render('pages/user/profile', { title: 'User profile', name: 'Profile' });
}

module.exports = userController;