var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/api/story/:id', function(req, res, next) {
	var options = {
			  uri: 'http://localhost:8080/storys/'+req.params.id,
			  method: 'GET',
			  json:true
			};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 ) {
				res.json(body);
				return;
		}
	});
});

router.get('/api/events/full/:id', function(req, res, next) {
	var options = {
			  uri: 'http://localhost:8080/events/full/'+req.params.id,
			  method: 'GET',
			  json:true
			};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 ) {
				res.json(body);
				return;
		}
	});
});

// Groups plus cause for user
router.get('/api/groups/pluscause/', function(req, res, next) {
	var options = {
			  uri: 'http://localhost:8080/groups/allpluscause/'+req.session.userid,
			  method: 'GET',
			  json:true
			};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 ) {
				res.json(body);
				return;
		}
	});
});

router.get('/api/groups/:id', function(req, res, next) {
	var options = {
			  uri: 'http://localhost:8080/groups/'+req.params.id,
			  method: 'GET',
			  json:true
			};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 ) {
				res.json(body);
				return;
		}
	});
});

//story api after user sess check
router.get('/api/storys/:type/:id', function (req, res) {
	if(req.params.type=="user" && req.session.userid>0){
		var url = 'http://localhost:8080/storys/'+req.params.type+'/'+req.session.userid;
	}
	var options = {
			  uri: url,
			  method: 'GET',
			  json:true
			};
	console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
	});	
});


//Event activity api for user 
router.get('/api/events/user/:id', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/events/user/'+req.session.userid,
			  method: 'GET',
			  json:true
			};
	console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
	});	
	}
	else 	
	{
		res.json([]);
	}
});
//Notification api for user 
router.get('/api/notifications/user/', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/notifications/user/'+req.session.userid+'?logic=0&maxl='+req.query.before,
			  method: 'GET',
			  json:true
			};
	console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
		else 	
		{
			res.json([]);
		}
	});	
	}
	else 	
	{
		res.json([]);
	}
});

//Feed api for user 
router.get('/api/feeds/user/', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/feeds/'+req.session.userid+'?max='+req.query.max,
			  method: 'GET',
			  json:true
			};
	console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
		else 	
		{
			res.json([]);
		}
	});	
	}
	else 	
	{
		res.json([]);
	}
});


//Following user activity api for user 
router.get('/api/follow/:user/', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/follows/'+req.session.userid+'/'+req.params.user+'/',
			  method: 'GET',
			  json:true
			};
	//console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
	});	
	}
	else 	
	{
		res.json([]);
	}
});

//Following user activity api for user 
router.get('/api/following/user/', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/follows/user/'+req.session.userid,
			  method: 'GET',
			  json:true
			};
	//console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
	});	
	}
	else 	
	{
		res.json([]);
	}
});

//Following user activity api for user 
router.get('/api/groups/panel/:type', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/groups/panel/'+req.params.type+'/'+req.session.userid,
			  method: 'GET',
			  json:true
			};
	//console.log(options.uri);
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
	});	
	}
	else 	
	{
		res.json([]);
	}
});

module.exports = router;