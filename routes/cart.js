var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Flight = require("../models/flight");
const Plane = require("../models/plane");
const Ticket = require("../models/ticket");
const Cart = require("../models/cart");
const { isLoggedIn, canLogOut } = require("../middleware");
const {
  addOutbound,
  addInbound,
  getChosenFlightId,
  getMyTickets,
  removeTicketFromCart,
} = require("../controllers/cart");
/* GET home page. */
router.get("/", canLogOut, function (req, res, next) {
  return res.render("cart.ejs");
});
router.post("/addoutbound", canLogOut, addOutbound);
router.post("/addinbound", canLogOut, addInbound);
router.get("/chosenflights", canLogOut, getChosenFlightId);
router.get("/tickets", canLogOut, getMyTickets);

module.exports = router;
