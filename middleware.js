module.exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}
module.exports.canLogOut = (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.redirect('/');
    }
    next();
}

