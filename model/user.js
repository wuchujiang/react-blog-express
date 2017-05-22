var mongodb = require('../conf/db');

function User(user) {
	this.user = user.user;
	this.password = user.password;
};

User.prototype.save = function(callback) {
	var user = {
		user: this.user,
		password: this.password
	};
	//打开数据库
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        //读取user集合
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            //将用户数据插入到user集合
            collection.insert(user, {
                safe: true
            }, function(err, result) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, result.ops[0]); //成功err为null，并且返回存储后的文档
            });
        });
    });
};

User.get = function(userName, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }

        //读取user
        db.collection('users', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.findOne({
                userName: userName
            }, function(err, user) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }

                callback(null, user); //返回查询到的用户信息
            })
        })
    })
};
module.exports = User;
