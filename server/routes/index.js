var express = require('express');
var router = express.Router();
var User = require('../models/user');
var config = require('../_config');
var init = require('../auth/init');
var passport = require('passport');
var passportTwitter = require('../auth/twitter');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// auth login route.
router.get('/login', function (req, res, next) {
  res.send('Go back and register, please');
});

// twitter auth routes
router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    console.log('here')
    res.json(req.user).redirect('/');
  });




module.exports = router;
