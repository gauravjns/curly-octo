var express = require('express');
var router = express.Router();
var request = require('request');


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
router.get('/api/notifications/user/:id', function (req, res) {
	if( req.session.userid>0){
	var options = {
			  uri:'http://localhost:8080/notifications/user/'+req.session.userid+'?logic=0',
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



module.exports = router;