var db = require('../conf/db');
var User = require('../model/user');
var user_control = {
	reg: function(req, res, next) {
		var user = req.body.user;
		var password = req.body.password;
		var repeatpassword = req.body.repeatpassword;
		if(password !== repeatpassword){
			return res.json({
				code: -1,
				message: '密码不一致'
			})
		}
		var User = new User({
			user: user,
			password: password
		});
		// 检查用户名是否存在
		User.get(user, function(err, user) {
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
			User.save(function(err, result) {
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
