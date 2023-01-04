var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingpage.ejs');  
});


/*-------Login Section-------*/
// GET login page 
router.get('/login', (req,res,next)=>{
  res.render('login.ejs');
});

// Post login page
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res,next)=>{

});

/*-------Register Section-------*/
/* GET register page */
router.get('/register',(req,res,next)=>{
  res.render('register.ejs');
});
module.exports = router;
