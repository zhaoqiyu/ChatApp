var express = require('express');
var router = express.Router();
var loginuser = require('../server/authentication.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/loginuser', function(req, res, next){
	console.log(req.body);
	var loginSuccess = loginuser(req.body.username, req.body.password);
	if (loginSuccess) {
		res.redirect('/index');
	}else{
		res.status(401).send("Username/Password incorrect");
	}
})

module.exports = router;
