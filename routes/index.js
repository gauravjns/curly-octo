var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about', { title: 'Express' });
});

//login
router.post('/forms/login', function (req, res) {
	var sess=req.session;
	var apiurl="http://localhost:8080/users/login/"+req.body.email+"/"+req.body.password;
	request.get(apiurl, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    console.log("user logged in " + body);
		    if (body>0)
		    	{ backURL=req.header('Referer') || '/';
		  	      sess.userid=body;
			  	    var apiurl="http://localhost:8080/users/"+body;
			  		request.get(apiurl, {json:true}, function (error, response, json) {
			  			  if (!error && response.statusCode == 200) {
			  				 sess.username= json.name;
			  				 sess.userurl= json.url;
			  				 sess.userimg= json.img;
			  				 if (json.status==2)
			  					 {res.redirect(backURL);}
			  				 if(json.status==1)
			  					 {/*verify email*/}
			  			     if(json.status==3)
				  				 {/*A recent password change has been request has been received, check your email*/}
			  			     if(json.status==4)
				  			     {/*activate profile*/}
			  			  	
			  			  }
			  			  else{ 
			  				res.render('404') 
			  			  }
			  			});
		    if (body==-1)
		    	{/*res.render('login', title:"You enter wrong password, please try again")*/}
		    if (body==0)
		    	{/*res.render('login', tile:"No such email exist, please verify email or register a new user.")*/}
		  }
		  else{ 
			res.render('404') 
		  }
		  }
		})
});

router.get('/logout', function(req, res){	  
	  req.session.destroy(function(err) {
		});
	  res.redirect('/gaurav-jain1');
	});

router.get('/forms/follow/:meta/:metaid', function(req, res){	  
	var sess=req.session;
	backURL=req.header('Referer') || '/';
	var options = {
			  uri: 'http://localhost:8080/follows/',
			  method: 'POST',
			  json: {
				   "userid":sess.userid,
				   "meta": req.params.meta,
				   "metaid": req.params.metaid,
				   "type": 1,
				   "status": 1
			  }
			};
	
	request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body);
			    console.log("User following");
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
			  }
			});
	
	});

router.get('/forms/unfollow/:meta/:metaid', function(req, res){	  
	var sess=req.session;
	backURL=req.header('Referer') || '/';
	var options = {
			  uri: 'http://localhost:8080/follows/',
			  method: 'DELETE',
			  json: {
				   "userid":sess.userid,
				   "meta": req.params.meta,
				   "metaid": req.params.metaid,
				   "type": 1,
				   "status": 1
			  }
			};
	
	request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body);
			    console.log("User unfollowing");
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
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
		msgid= s.substring(2, s.length-5);
	var options = {
			  uri: 'http://localhost:8080/notifications/user/'+sess.userid+'/?max='+notid,
			  method: 'GET',
			  json:true
			};

	var func;
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 && body.length > 0) {
				//console.log("1st response");
				i = 1;
				res.json(body);
		}
	});
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 10000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 20000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 30000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
					i = 1;
					res.json(body)
			}
		});
	}, 40000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if ( i==0) {
				if (!error && response.statusCode == 200) {
					if (body.length > 0) {
						res.json(body);
					}
					else {
						res.json([]);
					}
				} else {
					res.json([]);
				}
			}
		});
	}, 50000);
			
});

router.get('/messages/user/', function(req, res){
	var s=JSON.stringify(req.query);
	var msgid=s.substring(2,3);;
	var sess=req.session;
	var i=0;
	if (s.length>5)
		msgid= s.substring(2, s.length-5);
	var options = {
		uri: 'http://localhost:8080/messages/user/'+sess.userid+'?max='+msgid,
		method: 'GET',
		json:true
	};
	//console.log(msgid);
	var func;
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200 && body.length > 0) {
			//console.log("1st response");
			i = 1;
			res.json(body);
		}
	});
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 10000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 20000);

	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 30000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200 && body.length > 0 && i==0) {
				i = 1;
				res.json(body)
			}
		});
	}, 40000);
	setTimeout(function() {
		request(options, function (error, response, body) {
			if(i==0){
				if (!error && response.statusCode == 200) {
					if (body.length > 0 ) {
						res.json(body);
					}
					else {
						res.json([]);
					}
				}else{
					res.json([]);
				}
			}
		});
	}, 50000);

});

module.exports = router;
