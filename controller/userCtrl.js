var crypto = require('crypto');
var model = require('../model/model');
var jwt = require('jsonwebtoken');
var Model = model('user');

var user_control = {
	reg: function(req, res, next) {
		var userName = req.body.user;
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
		
		// 检查用户名是否存在
		Model.get({userName: userName}, function(err, result) {
			if(err) {
				return res.json({
					code: -1,
					message: '未知错误'
				});
			}

			if (result) {
	            return res.json({
					code: -1,
					message: '用户已存在'
				});
	        }
	        
	        var userInfo = {
				userName: userName,
				password: password,
		        createDate: new Date().toLocaleString(),
		        userId: new Date().getTime().toString().slice(2,9)
			};
			Model.save(userInfo, function(err, result) {
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
			});
		})
	},
	login: function(req, res, next) {
		var userName = req.body.user;
		var password = req.body.password;
		var md5 = crypto.createHash('md5');
		password = md5.update(password).digest('hex');
		
		Model.get({userName: userName}, function(err, result) {
			if(err) {
				return res.json({
					code: -1,
					message: '未知错误'
				});
			}

			if (!result) {
	            return res.json({
					code: -1,
					message: '用户不存在'
				});
	        }

	        if(password !== result.password){
	        	return res.json({
					code: -1,
					message: '密码错误'
				});
	        }

	        // var str = 'abcdefghijklmnopqrstuvwxyz1234567890';
	        var jwtTokenServet = '1stryavsdb2pcjo26c';
	        /*for(var i = 0; i < 18; i++ ){
				jwtTokenServet += str.charAt(Math.floor(Math.random() * (str.length)));
	        }*/
	        //生成token
	        var token = jwt.sign({userId: result.userId}, jwtTokenServet, {
	        	expiresIn: 60 * 60 * 12  //超时时间-秒
	        });

	        res.json({
	        	code: 0,
	        	message: '登录成功',
	        	token: token
	        });
		});
	}
}

module.exports = user_control;
