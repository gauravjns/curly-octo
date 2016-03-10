var express = require('express');
var router = express.Router();
var request = require('request');

// Story page
router.get('/:name.story', function (req, res) {
	var options = {
			  uri: 'http://localhost:8080/storys/name/'+req.params.name,
			  method: 'GET',
			  json:true
			};
	console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			console.log(body.story.name);
		  	res.render('story', {sess: req.session,  title: body.story.name + " | Blog ", story:body , follow:1});
		}
	});	
});

//Intern page
router.get('/:name.intern', function (req, res) {
	var options = {
			  uri: 'http://localhost:8080/events/name/'+req.params.name,
			  method: 'GET',
			  json:true
			};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var apiurl="http://localhost:8080/follows/"+req.session.userid+"/post/"+body.id+"/1";
			if (req.session.userid>0){
				request.get(apiurl, function (error, response, follow) {
		  			if (!error && response.statusCode == 200) {
		  				res.render('intern', { sess: req.session, title: body.name + " | Internship "  , follow:follow,intern:body });
		  			}
		  		})
			}
			else
			{
				res.render('intern', { sess: req.session, title: body.name + " | Internship " ,intern:body });	
			}
		}
	});
});

//Job page
router.get('/:name.job', function (req, res) {
  res.render('write', { title: req.params.name, template:"job" });
});

//Job page
router.get('/:name.voluteer', function (req, res) {
  res.render('about', { title: req.params.name, template:"volunteer" });
});

//Job page
router.get('/:name.event', function (req, res) {
  res.render('404', { title: req.params.name, template:"event" });
});



module.exports = router;
