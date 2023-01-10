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
  getCreateFlights,
  createFlight,
  searchFlight,
  getFlight,
  getSeats,
} = require("../controllers/flights");

router.get("/search", canLogOut, searchFlight);
/* GET flights listing. */
router.get("/create", canLogOut, isAdmin, getCreateFlights);
/* GET flights listing. */
router.post("/create", canLogOut, isAdmin, createFlight);
/* GET specifid Flight */
router.get("/:id", canLogOut, getFlight);
/* GET specifid Flight */
router.get("/:id/seats", canLogOut, getSeats);
/*POST create new flight */
//router.post("/", isLoggedIn );

module.exports = router;
