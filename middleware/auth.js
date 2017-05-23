var jwt = require('jsonwebtoken');
var model = require('../model/model');
var Model = model('user');
module.exports = function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var jwtTokenServet = '1stryavsdb2pcjo26c';
	if(token) {
		jwt.verify(token, jwtTokenServet, function(err, decoded) {
			if(err) {
				return res.json({
					code: -1,
					message: 'token信息错误'
				});
			}else{
				// 解析token获得的userid查询用户信息；
				Model.get({ userId: decoded.userId }, function(err, result) {
					if(err) {
						return res.json({
							code: -1,
							message: '没查到用户信息'
						});
					}
					req.userInfo = result;
					next();
				});
				
			}
		});
	} else {
		return res.status(403).send({
			success: false,
			message: '没有token！'
		});
	};
}