var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Flight = require("../models/flight");
const Plane = require("../models/plane");
const Ticket = require("../models/ticket");
const { isLoggedIn, canLogOut, isAdmin } = require("../middleware");
const {
  getAllPlanes,
  getPlane,
  createPlane,
  updatePlane,
} = require("../controllers/planes");
/* GET Plane listing. */
router.get("/", canLogOut, isAdmin, getAllPlanes);
/* GET specifid Plane */
router.get("/:id", canLogOut, isAdmin, getPlane);
router.put("/:id", canLogOut, isAdmin, updatePlane);
/* Post to create a new plane */
router.post("/", canLogOut, isAdmin, createPlane);

module.exports = router;
