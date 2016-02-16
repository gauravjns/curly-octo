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
	if (req.query.meta && req.session.userid>0)
	{
		res.render('write', {sess:req.session , title: 'Write Story', storyid:req.query.meta});
	}
	else {
	res.redirect('/login');	
	}
});
router.post('/savestory', function (req, res) {
	if ( req.session.userid>0)
	{
		console.log(req.body);
		res.json({"ss":"sasasa"});
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
							console.log(msglist)
							res.render('message', { title:'kuchbhi' , threadlist :threadlist, msglist:msglist, sess:sess });	
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
