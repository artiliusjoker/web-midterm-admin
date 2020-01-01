const validate = require('../config/validate');
var userController = {}

userController.listUser = function (req, res, next) {
    res.render('pages/tables', { title: 'List User', name: 'List User' });
}

userController.detailUser = async (req, res) => {
    const queryDetail = null;
    res.render('user/detail', {
        relate: null,
        detail: queryDetail
    });
}

module.exports = userController;