var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dash', { title: 'Express', sess: req.session,  });
});

// Counter for redirection
router.get('/counter', function(req, res, next) {
	console.log(req.query);
	if (req.query.notid)
		{
			request.post('http://localhost:8080/notifications/'+req.query.notid, function (error, response, body) {
				  if (!error && response.statusCode == 200) {
					 
				  }
					});
		}
	res.redirect(req.query.link);
});

router.get('/logout', function(req, res){	  
	  req.session.destroy(function(err) {
		});
	  res.redirect('/gaurav-jain1');
	});

router.get('/getcomments/:meta/:metaid/:sort', function(req, res){
	var options = {
			  uri: 'http://localhost:8080/comments/'+req.params.meta+'/'+req.params.metaid+'/'+req.params.sort,
			  method: 'GET',
			  json:true
			};
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 && body.length > 0) {
				res.json(body);
				return;
		}
	});
});

//Notification poll
router.get('/notifications/user/', function(req, res){
	var s=JSON.stringify(req.query);
	var notid= s.substring(2,3);
	var sess=req.session;
	var i=0;
	if (s.length>5)
		notid= s.substring(2, s.length-5);
	var options = {
			  uri: 'http://localhost:8080/notifications/user/'+sess.userid+'/?max='+notid,
			  method: 'GET',
			  json:true
			};

	console.log(s);
	console.log(notid);
	console.log(options.uri);
	if (!sess.userid)
		{
			res.json([]);
			return;
		}
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 && body.length > 0) {
				console.log("1st response");
				i = 1;
				res.json(body);
				return;
		}
	});
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				console.log("2nd response");
				i = 1;
				res.json(body);
				return;
			}
		});
	}, 10000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				console.log("3rd response");
				i = 1;
				res.json(body);
				return;
			}
		});
	}, 20000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body);
				return;
			}
		});
	}, 30000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
					i = 1;
					res.json(body);
					return;
			}
		});
	}, 40000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
					i = 1;
					res.json(body);
					return;
			}
		});
	}, 50000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if ( i==0) {
				if (!error && response.statusCode == 200) {
					if (body.length > 0) {
						res.json(body);
						return;
					}
					else {
						res.json([]);
						return;
					}
				} else {
					res.json([]);
					return;
				}
			}
		});
	}, 58000);
			
});

router.get('/messages/user/', function(req, res){
	var s=JSON.stringify(req.query);
	var msgid=s.substring(2,3);
	var sess=req.session;
	var i=0;
	if (s.length>5)
		msgid= s.substring(2, s.length-5);
	var options = {
		uri: 'http://localhost:8080/messages/user/'+sess.userid+'/?max='+msgid,
		method: 'GET',
		json:true
	};
	console.log(msgid);
	console.log(s);
	console.log(options.uri);
	if (!sess.userid)
		{
			res.json([]);
			return;
		}
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 && body.length > 0) {
				console.log("1st response");
				i = 1;
				res.json(body);
				return;
		}
	});
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				console.log("2nd response");
				i = 1;
				res.json(body);
				return;
			}
		});
	}, 10000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				console.log("3rd response");
				i = 1;
				res.json(body);
				return;
			}
		});
	}, 20000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body);
				return;
			}
		});
	}, 30000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
					i = 1;
					res.json(body);
					return;
			}
		});
	}, 40000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
					i = 1;
					res.json(body);
					return;
			}
		});
	}, 50000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if ( i==0) {
				if (!error && response.statusCode == 200) {
					if (body.length > 0) {
						res.json(body);
						return;
					}
					else {
						res.json([]);
						return;
					}
				} else {
					res.json([]);
					return;
				}
			}
		});
	}, 58000);
});


module.exports = router;
