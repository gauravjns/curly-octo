var express = require('express');
var router = express.Router();
var http = require('http');

// About page
router.get('/about', function (req, res) {
	  sess=req.session;
	  res.render('about', { title: sess.userid });
});


module.exports = router;
