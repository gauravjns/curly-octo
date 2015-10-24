var express = require('express');
var router = express.Router();

//user page
router.get('/:name', function (req, res) {
  res.render('about', { title: req.params.name, template:"user"  });
});

module.exports = router;
