var express = require('express');
var router = express.Router();
var user_control = require('../controller/userCtrl');

// 注册
router.post('/register', function(req, res, next) {
 	user_control.reg(req, res, next);
});

// 登录
router.post('/login', function(req, res, next) {
 	user_control.login(req, res, next);
});


module.exports = router;
