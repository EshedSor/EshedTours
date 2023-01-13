var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const { isLoggedIn, canLogOut } = require("../middleware");

//authentication setup
//authentication setup
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.render("landingpage.ejs");
});

//Settings
router.get("/settings", canLogOut, function (req, res, next) {
  return res.render("settings.ejs");
});
/*-------Login Section-------*/
// GET login page
router.get("/login", isLoggedIn, (req, res, next) => {
  return res.render("login.ejs");
});

// Post login page
router.post(
  "/login",
  isLoggedIn,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    req.flash("success", "Login succesful");
    console.log("login " + req.session.returnTo);
    const redirectURL = req.session.returnTo || "/";
    console.log(req.session.returnTo);
    delete req.session.returnTo;
    return res.redirect(redirectURL);
  }
);

//logout
router.post("/logout", canLogOut, (req, res) => {
  req.logout((err) => {
    console.log(err);
  });
  req.flash("success", "Logout succesful");
  console.log("logout " + res.locals.messages);
  const redirectURL = "/login";
  delete req.session.returnTo;
  return res.redirect(redirectURL);
});
/*-------Register Section-------*/
/* GET register page */
router.get("/register", isLoggedIn, (req, res, next) => {
  return res.render("register.ejs");
});
module.exports = router;
