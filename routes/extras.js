var express = require('express');
var router = express.Router();
var request = require('request');

// About page
router.get('/about', function (req, res) {
	  sess=req.session;
	  res.render('about', { title: sess.userid });
});
router.get('/login', function (req, res) {
	  if (req.session.userid>0)
	  {  res.redirect('/'+ req.session.userurl);
	  }
	  else {
	  res.render('login', { title: 'Login to Helpiez' });
	  }
});
router.get('/write', function (req, res) {
	backURL=req.header('Referer') || '/';
	if (req.query.meta && req.session.userid>0)
	{
		res.render('write', {sess:req.session , title: 'Write Story', storyid:req.query.meta});
	}
	else {
	res.redirect('/login');	
	}
});
router.post('/savestory', function (req, res) {
	if ( req.session.userid>0 && req.body.authorid==req.session.userid)
	{
		console.log(req.body);
		var options = {
				  uri: 'http://localhost:8080/storys/',
				  method: 'put',
				  json: req.body
				};
		request(options, function (error, response, body) {
			  if (!error && response.statusCode == 200 && body==true) {
			    console.log("story saved");
				res.json({"msg":"Successful"});
			  }
			  else {
				  res.json({"msg":"Failed"});
			  }
			});
	}
	else {
		res.redirect('/login');	
	}
});
router.get('/messages', function (req, res) {
	  sess=req.session;
	  var options = {
			  uri: 'http://localhost:8080/messages/user/'+sess.userid+'/?limit=0&viewed=0',
			  method: 'GET',
			  json:true
			};
	  var options1 = {
			  uri: 'http://localhost:8080/messages/2users/?thread='+req.query.thread,
			  method: 'GET',
			  json:true
			};
	  request(options, function (error, response, threadlist) {
			if (!error && response.statusCode == 200 && threadlist.length > 0) {
				if (req.query.thread) 
					{
					request(options1, function (error, response, msglist) {
						if (!error && response.statusCode == 200 && msglist.length > 0) {
							//console.log(msglist)
							if (msglist[0].userid==sess.userid)
							{
							 usertoid=msglist[0].userto	
							}
							else 
							{
							 usertoid=msglist[0].userid
							}
								var apiurl="http://localhost:8080/users/"+usertoid
								request.get(apiurl, {json:true}, function (error, response, json) {
									if (!error && response.statusCode == 200) {
										console.log(json)	
									res.render('message', { title:'Messages' , threadlist :threadlist, msglist:msglist, sess:sess, userto:json });		
									}
								});
							
							}
						});
					}
				else
					{
					res.render('message', { title: sess.userid, threadlist :threadlist });
					}
			}
		});
  
});

module.exports = router;
