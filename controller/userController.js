const userService = require('../models/userService');
const ejsHelper = require('../views/helpers/helper');
var userController = {}

userController.listUser = async function (req, res, next) {
    const users = await userService.queryAllUsers(req, res);
    res.render('pages/tables', { title: 'List User', name: 'List User', users : users, listUser : ejsHelper.listUsers });
}

userController.getDetails = async (req, res, next) => {
    const user = await userService.querryDetail(req, res);
    if(!user)
    {
        res.render('pages/user/profile', { title: 'User profile', name: 'Profile', detail: 'null' });
    }
    else res.render('pages/user/profile', { title: 'User profile', name: 'Profile', detail : user, helperStatus: ejsHelper.selectedOption });
}

userController.updateDetails = async (req, res, next) => {
    const check = await userService.updateUser(req.params.id, req.body);
    req.flash(check.type, check.message);
    res.redirect(`/user/${req.params.id}`);
}

userController.getAddUser = (req, res, next) => {
    res.render('pages/user/add', { title: 'Add user', name: 'Add user'});
}

userController.postAddUser = async (req, res, next) => {
    const check = await userService.addUser(req.body);
    const messageType = check ? 'success' : 'error';
    req.flash(messageType, check.message);
    res.redirect('/user/add');
}

userController.deleteUser = async (req, res, next) => {
    const result = await userService.deleteUser(req.params.id);
    res.send(result);
}

module.exports = userController;