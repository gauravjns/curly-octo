var express = require('express');
var router = express.Router();

// About page
router.get('/about', function (req, res) {
  res.render('about', { title: 'Express' });
});

module.exports = router;
