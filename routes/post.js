var express = require('express');
var router = express.Router();

// Story page
router.get('/:name.story', function (req, res) {
  res.render('about', { title: req.params.name, template:"story" });
});

//Intern page
router.get('/:name.intern', function (req, res) {
  res.render('about', { title: req.params.name, template:"intern" });
});

//Job page
router.get('/:name.job', function (req, res) {
  res.render('about', { title: req.params.name, template:"job" });
});

//Job page
router.get('/:name.voluteer', function (req, res) {
  res.render('about', { title: req.params.name, template:"volunteer" });
});

//Job page
router.get('/:name.event', function (req, res) {
  res.render('about', { title: req.params.name, template:"event" });
});



module.exports = router;
