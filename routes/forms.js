var express = require('express');
var router = express.Router();
var request = require('request');
var multer  =   require('multer');
var upload = multer({ dest: 'public/upload/' })


router.post('/forms/write', function (req, res) {	

    backURL=req.header('Referer') || '/';
	var resar = req.body.groupid.split(",");	
	var options = {
				  uri: 'http://localhost:8080/storys/',
				  method: 'post',
				  json: {   
					    "name": req.body.name,
					    "type": "story",
					    "extra": "",
					    "status": 1,
					    "groupid": resar[0],
					    "featuredimage":resar[1],
					    "authorid": req.session.userid,
					    "commentstatus":1,
					    "blog": {
					      "content": " ",
					      "textextra": "" 
					    }
					}
				};
	    console.log(options);
		request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200) {

				    console.log(body);
			    res.redirect('/write?meta='+body)
			  }
			  else {
				res.redirect(backURL);
			  }
			});
		
	})
	
router.post('/forms/upload/image', upload.single('profilepic'), function (req, res, next) {
	console.log(req.file) 
    backURL=req.header('Referer') || '/';
    var options = {
				  uri: 'http://localhost:8080/users/'+sess.userid,
				  method: 'put',
				  json: { "img": 'upload/'+req.file.filename
					  }
				};
		
	console.log(options); 
	request(options, function (error, response, body) {
		  if (!error && response.statusCode == 200 && body==true) {
			req.session.userimg= options.json.img;
		    res.status(204).end()
		    res.redirect(backURL);
		  }
		  else {
			  res.json({"msg":"Failed"});
		  }
		});
})

router.post('/forms/image/story', upload.single('profilepic'), function (req, res, next) {
	console.log(req.file) 
    backURL=req.header('Referer') || '/';
    var options = {
				  uri: 'http://localhost:8080/storys/',
				  method: 'put',
				  json: { "featuredimage": 'upload/'+req.file.filename, 
					  	  "id":req.body.storyid, 
					  	  "blogid":req.body.blogid
					  }
				};
		
	console.log(options); 
	request(options, function (error, response, body) {
		  if (!error && response.statusCode == 200 && body==true) {
			req.session.userimg= options.json.img;
		    res.status(204).end()
		    res.redirect(backURL);
		  }
		  else {
			  res.json({"msg":"Failed"});
		  }
		});
})


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
			  				 sess.extra= json.userxtra;
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
//comment flagging
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
	console.log(options.json)
	if (req.query.remove && (req.query.meta=='comment'||req.query.meta=='post') )
	{	console.log('jhdsjdh shd s hd sh djs dj ')
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
				   console.log("activity deleted");
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
			    console.log("activity post by updated method");
			    res.redirect(backURL);
			  }
			  else {
				  console.log("Error activity post by updated method");
				    
				  res.redirect(backURL);
			  }
			});
	}
	// add notification
	
	});




module.exports = router;