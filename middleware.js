const User = require("./models/user");
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
module.exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    console.log("id " + user);
    if (user) {
      if (user.role === "admin") {
        next();
      } else {
        req.flash("success", "Permission denied");
        return res.redirect("/");
      }
    } else {
      req.flash("success", "Permission denied");
      return res.redirect("/");
    }
  } catch (e) {
    req.flash("success", "Permission denied");
    return res.redirect("/");
  }
};
