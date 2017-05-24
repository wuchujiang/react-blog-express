var trimHtml = require('trim-html');
var model = require('../model/model');
var Model = model('article');
var article_control = {
	all: function(req, res, next) {
		Model.getOwn(function(err, result) {
			if(err) {
				return res.json({
					code: -1,
					message: '未知错误'
				});
			}
			return res.json({
				code: 0,
				message: '查询成功',
				data: result
			});

		});
	},

	one: function(req, res, next) {
		console.log(req.params.id);
		Model.getOne({ articleId: req.params.id}, function (err, result) {
			if(err) {
				return res.json({
					code: -1,
					message: '未知错误'
				});
			}
			return res.json({
				code: 0,
				message: '查询成功',
				data: result
			});
		})
	},

	writer: function(req, res, next) {
		var abstract = trimHtml(req.body.content, { preserveTags: false });
		var writerInfo = {
			title: req.body.title,
			keyword: req.body.keyword,
			content: req.body.content,
			recommend: req.body.recommend,
			abstract: abstract,
			createDate: new Date().toLocaleString(),
	        articleId: new Date().getTime().toString().slice(2,9),
	        authorId: req.userInfo.userId,
	        anthor:  req.userInfo.userName,
	        words: (trimHtml(req.body.content).html).length,
	        pv: 0
		};
		Model.save(writerInfo, function(err, result) {
			if(err) {
				return res.json({
					code: -1,
					message: '未知错误'
				});
			}
			return res.json({
				code: 0,
				message: '提交成功',
				articleId: result.articleId
			});
		});
		
	},

	edit: function(req, res, next) {

	},

	delete: function(req, res, next) {

	}
}

module.exports = article_control;