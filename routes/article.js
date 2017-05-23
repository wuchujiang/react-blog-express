var express = require('express');
var router = express.Router();
var article_control = require('../controller/articleCtrl');

// 验证中间件
var auth = require('../middleware/auth');

// 所有文章
router.post('/', function(req, res, next) {
	article_control.all(req, res, next);
});

// // 获取一篇文章
// router.post('/:id', function(req, res, next) {
// 	article_control.one(req, res, next);
// });
// 	console.log(23);


router.post('/writer', auth, function(req, res, next) {
 	article_control.writer(req, res, next);
});


// // 编辑文章
// router.post('/edit/:id', auth, function(req, res, next) {
// 	article_control.edit(req, res, next);
// });

// // 删除文章
// router.post('/delete:id', auth, function(req, res, next) {
// 	article_control.delete(req, res, next);
// });

module.exports = router;



