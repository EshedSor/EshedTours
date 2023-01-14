var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");
const Flight = require("../models/flight");
const Plane = require("../models/plane");
const Ticket = require("../models/ticket");

const { isLoggedIn, canLogOut } = require("../middleware");
const {
  getTicket,
  createTicket,
  deleteTicket,
} = require("../controllers/tickets");
router.get("/:id", canLogOut, getTicket);
router.delete("/:id", canLogOut, deleteTicket);
router.post("/", canLogOut, createTicket);
module.exports = router;
