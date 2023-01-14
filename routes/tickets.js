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
  getHistory,
} = require("../controllers/tickets");
router.post("/", canLogOut, createTicket);
router.get("/history", canLogOut, getHistory);
router.get("/:id", canLogOut, getTicket);
router.delete("/:id", canLogOut, deleteTicket);

module.exports = router;
