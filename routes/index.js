var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article', function(req, res) {
	res.json({
		code: 200,
		success: '成功'
	});
});

module.exports = router;
