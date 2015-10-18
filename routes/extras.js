var express = require('express');
var router = express.Router();


// respond with "Hello World!" on the homepage
router.get('/about', function (req, res) {
  res.render('about', { title: 'Express' });
});

module.exports = router;
