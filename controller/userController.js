const validate = require('../config/validate');
var userController = {}

userController.checkLoggedIn = function (req, res, next) {
    if(validate.isLoggedIn(req)) return next();
     else res.redirect('/');
 };

userController.listUser = function (req, res, next) {
    res.render('pages/tables', { title: 'List User', name: 'List User' });
}

module.exports = userController;