var crypto = require('crypto');
var db = require('../conf/db');
var User = require('../model/user');

var user_control = {
	reg: function(req, res, next) {
		var user = req.body.user;
		var password = req.body.password;
		var repeatpassword = req.body.repeatPassword;
		if(password !== repeatpassword){
			return res.json({
				code: -1,
				message: '密码不一致'
			});
		}
		var md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		var Register = new User({
			userName: user,
			password: password
		});
		// 检查用户名是否存在
		Register.get(user, function(err, user) {
			if(err) {
				return res.json({
					code: -1,
					message: '未知错误'
				});
			}

			if (user) {
	            return res.json({
					code: -1,
					message: '用户已存在'
				});
	        }
			Register.save(function(err, result) {
				if(err) {
					return res.json({
						code: -1,
						message: '未知错误'
					});
				}
				return res.json({
					code: 0,
					message: '注册成功'
				});
			})
		})

	}
}

module.exports = user_control;
