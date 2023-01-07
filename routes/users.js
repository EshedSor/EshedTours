var express = require("express");
var router = express.Router();
var flash = require("connect-flash");
var methodOverride = require("method-override");
const User = require("../models/user");
const { isLoggedIn, canLogOut, isCurrentUser } = require("../middleware");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserEdit,
} = require("../controllers/users");
router.use(flash());

/* GET users listing. */
router.get("/", canLogOut, getAllUsers);

/* GET specifid User */
router.get("/:id", canLogOut, isCurrentUser, getUser);

/*POST create new user (register) */
router.post("/", isLoggedIn, createUser);

/* PUT/PATCH updates exiting user */
router.put("/:id/edit", canLogOut, isCurrentUser, updateUser);
/* DELETE specific user */
router.delete("/:id", canLogOut, isCurrentUser, deleteUser);
module.exports = router;
