var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dash', { title: 'Express', sess: req.session,  });
});

/* GET home page. */
router.get('/story/:id', function(req, res, next) {
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


router.post('/form/postmsg/', function(req, res){	  
	var sess=req.session;
	backURL=req.header('Referer') || '/';
	var options = {
			  uri: 'http://localhost:8080/messages/',
			  method: 'post',
			  json: {
					    "userid": sess.userid,
					    "message": req.body.message,
					    "thread": req.body.thread,
					    "userto": req.body.to
				
			  }
			};
	
	request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body);
			    console.log("msg post");
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
			  }
			});
	
	});

// Comment post
router.post('/forms/comment/', function(req, res){	  
	backURL=req.header('Referer')+ '#'+req.body.redirect || '/';
	var options = {
			  uri: 'http://localhost:8080/comments/',
			  method: 'post',
			  json: {
				    "userid": req.session.userid,
				    "commeta": req.body.meta,
				    "commetaid": req.body.metaid,
				    "content": req.body.comment,
				    "extra": "active"
				    
				  }
			};
	request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
			  }
			});
	
	
	// add email of req.body.email from  user that you got a comment, if mail check box is yes 
	
	});

//Comment delete
router.post('/forms/comment/delete', function(req, res){	  
	backURL=req.header('Referer')+ '#'+req.body.redirect || '/';
	var options = {
			  uri: 'http://localhost:8080/comments/inact/'+req.session.userid+'/'+req.body.deleteid,
			  method: 'post'
			};
	console.log(options.uri);
	request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
			  }
			});
	});
//comment flagged
router.post('/forms/activitys/post', function(req, res){	  
	backURL=req.header('Referer')+ '#'+req.body.redirect || '/';
	var options = {
			  uri: 'http://localhost:8080/activitys/',
			  method: 'post',
			  json: {
				    "userid": req.session.userid,
				    "actmeta": req.body.metatype,
				    "actmetaid":req.body.metaid ,
				    "type": req.body.type,
				    "status": req.body.status,
				    "extra":req.body.extra		    
				  }
			};
	
		request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body);
			    console.log("activity post");
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
			  }
			});
		
		// mail if there is some message
	
	});

//Activity post
router.get('/forms/activity/', function(req, res){	  
	// Put required checks 
	backURL=req.header('Referer')+'#'+req.query.redirect || '/';
	var options = {
			  uri: 'http://localhost:8080/activitys/',
			  method: 'post',
			  json: {
				    "userid": req.session.userid,
				    "actmeta": req.query.meta,
				    "actmetaid":req.query.metaid ,
				    "type": req.query.type,
				    "status": req.query.status,
				    "extra":req.query.extra		    
				  }
			};
	check=1;
	if (req.query.remove && req.query.meta=='comment' )
	{	//console.log('jhdsjdh shd s hd sh djs dj ')
		var options1 = {
			  uri: 'http://localhost:8080/activitys/delete/',
			  method: 'post',
			  json: {
				    "userid": req.session.userid,
				    "actmeta": req.query.meta,
				    "actmetaid":req.query.metaid ,
				    "type": req.query.type		    
				  }
			};
		if (req.query.remove==1)
		{
			check =0;
			request(options1, function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				    //console.log(body);
				    //console.log("activity deleted");
				    res.redirect(backURL);
				  }
				  else {
					  //console.log(options1)
						
					res.redirect(backURL);
				  }
				});
			
		}
		if (req.query.remove==-1)
		{
			if (req.query.type === "upvote" )
				{ options1.json.type='downvote';}
			if (req.query.type === "downvote" )
			{
				options1.json.type='upvote';
			}
			request(options1, function (error, response, body) {
				  if (!error && response.statusCode == 200) {
				    //console.log(body);
				   // console.log("activity deleted");
				   // res.redirect(backURL);
				  }
				  else {
					res.redirect(backURL);
				  }
				});
		}
	}
	
	//console.log(options.json);
	if (check==1)
	{
	request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {
			    console.log(body);
			    console.log("activity post");
			    res.redirect(backURL);
			  }
			  else {
				res.redirect(backURL);
			  }
			});
	}
	// add notification
	
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
