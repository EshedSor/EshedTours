var express = require('express');
var router = express.Router();


const User = require('../models/user');


/* GET users listing. */
router.get('/', (req, res, next)=> {
  res.send('respond with a resource');
});

/* GET specifid User */
router.get('/:id',(req,res,next)=>{

});

/*POST create new user (register) */
router.post('/',(req,res,next)=>{

});

/* PUT/PATCH updates exiting user */
router.put('/:id',(req,res,next)=>{

});

/* DELETE specific user */
router.delete('/:id',(req,res,next)=>{

});
module.exports = router;
