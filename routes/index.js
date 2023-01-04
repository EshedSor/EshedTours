var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');
const {isLoggedIn,canLogOut} = require('../middleware');
//authentication setup
//authentication setup
passport.use(new LocalStrategy({usernameField:'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.render('landingpage.ejs');  
});


/*-------Login Section-------*/
// GET login page 
router.get('/login',isLoggedIn, (req,res,next)=>{
  return res.render('login.ejs');
});

// Post login page
router.post('/login',isLoggedIn,passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
  req.flash('success','Login succesful');
  return res.redirect('/');

});

//logout
router.post('/logout',canLogOut,(req,res)=>{
  req.logout((err)=>{console.log(err);});
  req.flash('success','Logout succesful');
  console.log('logout ' + res.locals.messages);
  return res.redirect('/login');
});
/*-------Register Section-------*/
/* GET register page */
router.get('/register',isLoggedIn,(req,res,next)=>{
  return res.render('register.ejs');
});
module.exports = router;
