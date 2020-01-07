const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');
const check = require('../controller/adminController').checkLoggedIn;

router.delete('/:id', controller.deleteUser);

router.get('*', check);

router.get('/', controller.listUser);

router.get('/list', controller.listUser);

router.get('/add', controller.getAddUser);

router.post('/add', controller.postAddUser);

router.get('/:id', controller.getDetails);

router.post('/:id', controller.updateDetails);

module.exports = router;