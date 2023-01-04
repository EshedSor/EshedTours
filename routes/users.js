var express = require('express');
var router = express.Router();
var flash = require('connect-flash')

const User = require('../models/user');
const {isLoggedIn} = require('../middleware');


router.use(flash());

/* GET users listing. */
router.get('/', (req, res, next)=> {
  return res.send('respond with a resource');
});

/* GET specifid User */
router.get('/:id',(req,res,next)=>{

});

/*POST create new user (register) */
router.post('/',isLoggedIn,async (req,res,next)=>{
  //destructuring body
  try{
  const {name,surname,email,password} = req.body;
  const user = new User({name,surname,email});
  const registered = await User.register(user,password);
  console.log(registered);
  req.flash('success','Welcome to Eshedtours');
  return res.redirect('/');
}catch(e){
  req.flash('success','Email already in use');
  return res.redirect('../register')

}

});

/* PUT/PATCH updates exiting user */
router.put('/:id',(req,res,next)=>{

});

/* DELETE specific user */
router.delete('/:id',(req,res,next)=>{

});
module.exports = router;
