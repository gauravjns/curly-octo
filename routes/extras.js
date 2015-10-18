var express = require('express');
var router = express.Router();


// respond with "Hello World!" on the homepage
router.get('/about', function (req, res) {
  res.render('Hello World! You are at home');
});

module.exports = router;
