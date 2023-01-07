module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};
module.exports.canLogOut = (req, res, next) => {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    console.log(req.session.returnTo);
    return res.redirect("/login");
  }
  next();
};
module.exports.isCurrentUser = (req, res, next) => {
  const { id } = req.params;
  if (id == req.user._id) {
    next();
  } else {
    return res.redirect("/users/" + req.user._id);
  }
};
