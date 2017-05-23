var mongodb = require('../conf/db');

var model = function(table) {
	return {
		save: function(data, callback) {
			//打开数据库
		    mongodb.open(function(err, db) {
		        if (err) {
		            return callback(err);
		        }
		        //读取user集合
		        db.collection(table, function(err, collection) {
		            if (err) {
		                mongodb.close();
		                return callback(err);
		            }

		            //将用户数据插入到user集合
		            collection.insert(data, {
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
		},

		get: function(data, callback) {
			mongodb.open(function(err, db) {
		        if (err) {
		            return callback(err);
		        }

		        //读取user
		        db.collection(table, function(err, collection) {
		            if (err) {
		                mongodb.close();
		                return callback(err);
		            }

		            collection.findOne(data, function(err, user) {
		                mongodb.close();
		                if (err) {
		                    return callback(err);
		                }

		                callback(null, user); //返回查询到的用户信息
		            })
		        })
			})
		},

		getOwn: function(callback) {
		    mongodb.open(function(err, db) {
		        if (err) {
		            return callback(err);
		        }
		        db.collection(table, function(err, collection) {
		            if (err) {
		                mongodb.close();
		                return callback(err);
		            }
		            collection.find().sort({
		                time: -1
		            }).toArray(function(err, docs) {
		                mongodb.close();
		                if (err) {
		                    return callback(err);
		                }
		                callback(null, docs);
		            });
		        });
		    })
		},

		getOne: function(data, callback) {
		    mongodb.open(function(err, db) {
		        if (err) {
		            return callback(err);
		        }
		        db.collection(table, function(err, collection) {
		            if (err) {
		                mongodb.close();
		                return callback(err);
		            }
		            collection.findOne(data, function(err, docs) {
		                mongodb.close();
		                if (err) {
		                    return callback(err);
		                }
		                callback(null, docs);
		            });
		        });
		    })
		},
	}
}

module.exports = model;
