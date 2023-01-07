var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Flight = require("../models/flight");
const Plane = require("../models/plane");
const Ticket = require("../models/ticket");

const { isLoggedIn, canLogOut } = require("../middleware");

//authentication setup
//authentication setup
passport.use(
  new LocalStrategy({ usernameField: "email" }, User.authenticate())
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
