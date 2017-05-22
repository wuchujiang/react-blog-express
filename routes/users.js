var express = require('express');
var router = express.Router();
var user_control = require('../controller/userCtrl');

/* GET users listing. */
router.post('/register', function(req, res, next) {
 	user_control.reg(req, res, next);
});

module.exports = router;
