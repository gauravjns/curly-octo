var express = require('express');
var router = express.Router();
var request = require('request');


//user page
router.get('/:name', function (req, res) {
	sess=req.session;
	var apiurl="http://localhost:8080/users/url/"+req.params.name
	console.log(apiurl);
	request.get(apiurl, {json:true}, function (error, response, json) {
		if (!error && response.statusCode == 200) {
			if (sess.userid>0){
				var apiurl="http://localhost:8080/follows/"+sess.userid+"/user/"+json.id+"/1"
				//console.log(apiurl);
				request.get(apiurl, function (error, response, body) {
		  			if (!error && response.statusCode == 200) {
		  				res.render('userpublic', { sess: sess, title: json.name , follow: body,user:json, template:"user"  });
		  			  }
		  		})
			}
			else {
			console.log('user not set');
		    res.render('userpublic', { sess: sess, title: json.name, user:json, template:"user"  });
			}
		}
		else{ 
			res.render('404') 
		}
	})
});

module.exports = router;
