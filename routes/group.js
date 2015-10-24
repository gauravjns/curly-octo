var express = require('express');
var router = express.Router();

//NSS page
router.get('/:name.nss', function (req, res) {
  res.render('about', { title: req.params.name, template:"nss" });
});

//NGO page
router.get('/:name.ngo', function (req, res) {
  res.render('about', { title: req.params.name, template:"ngo" });
});

//Startup page
router.get('/:name.startup', function (req, res) {
  res.render('about', { title: req.params.name, template:"startup" });
});

//group page
router.get('/:name.club', function (req, res) {
  res.render('about', { title: req.params.name, template:"club" });
});
//group page
router.get('/:name.campaign', function (req, res) {
  res.render('about', { title: req.params.name, template:"campaign" });
});

//group page
router.get('/:name.cause', function (req, res) {
  res.render('about', { title: req.params.name, template:"cause" });
});


module.exports = router;
