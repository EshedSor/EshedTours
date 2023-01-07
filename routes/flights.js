var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Flight = require("../models/flight");
const Plane = require("../models/plane");
const Ticket = require("../models/ticket");
const { isLoggedIn, canLogOut } = require("../middleware");

/* GET flights listing. */
router.get("/", canLogOut);
/* GET specifid User */
router.get("/:id", canLogOut);
/* Post to add item to cart */
router.post("/:id", canLogOut);
/*POST create new flight */
//router.post("/", isLoggedIn );

module.exports = router;
