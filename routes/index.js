const router = require('express').Router()
const passport = require('passport')

router.get('/', function(req, res) {
    res.render('index',{
      user: req.user,
    });
  });

router.get('/auth/google', passport.authenticate('google',{
    scope: ['profile', 'email']
}))

router.get('/oauth2callback', passport.authenticate('google',{
    successRedirect: '/calendar',
    failureRedirect: '/'
}))

router.get('/logout', function(req, res){
    req.logOut(),
    res.redirect('/')
})

module.exports = router