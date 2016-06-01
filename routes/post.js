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
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			if(body.story.status==2 || ( req.session.userid>0 && body.story.status==1 && body.story.authorid==req.session.userid ) )
			{ 
				res.render('story', {sess: req.session,  title: body.story.name + " | Blog ", story:body , follow:1}); 
			}
			else {
				res.render('404', { title: req.params.name });
			}	
		}
		else {
			res.render('404', { title: req.params.name });
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

//Job page
router.get('/create.:name', function (req, res) {

  if (!req.session.userid>0)
  {
    res.render('login', { title: "Create Internship ", sess: req.session, message: "Please Login to Post " +req.params.name });  
  }
  else 
  {
	  if (req.params.name=="internship")
	  {
	    res.render('hire-intern', { title: "Create Internship ", sess: req.session});
	  }
	  else
	  {
	    res.render('404', { title: "Not Found", template:"event" });
	  } 
  }
	
});

module.exports = router;
