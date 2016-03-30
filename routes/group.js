var express = require('express');
var router = express.Router();
var request = require('request');

//NSS page
router.get('/:name.nss', function (req, res) {
  sess= req.session;
  res.render('about', { title: req.params.name, template:sess.views });
});

//NGO page
router.get('/:name.ngo', function (req, res) {
  res.render('about', { title: req.params.name, template:"ngo" });
});

//Startup page
router.get('/:name.com', function (req, res) {
  res.render('about', { title: req.params.name, template:"company" });
});

//group page
router.get('/:name.club', function (req, res) {
  res.render('about', { title: req.params.name, template:"club" });
});
//group page
router.get('/:name.camp', function (req, res) {
  res.render('about', { title: req.params.name, template:"campaign" });
});

//group page
router.get('/:name.cause', function (req, res) {
  res.render('about', { title: req.params.name, template:"cause" });
});

//group page
router.get('/:name.gov', function (req, res) {
  res.render('about', { title: req.params.name, template:"gov" });
});

//group maage page
router.get('/:name.run', function (req, res) {
  res.render('org', { title: req.params.name, sess:req.session });
});


module.exports = router;
