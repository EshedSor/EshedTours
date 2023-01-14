var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Ticket = require("../models/ticket");
const Cart = require("../models/cart");
const Flight = require("../models/flight");
const { isLoggedIn, canLogOut } = require("../middleware");
const { createOrder, capturePayment } = require("../controllers/payment");
router.get("/", canLogOut, (req, res, next) => {
  return res.render("checkout.ejs");
});
router.post("/order", canLogOut, async (req, res, next) => {
  const mycart = await Cart.findOne({ owner: req.user._id }).exec();
  const total = await mycart.cartTotal();
  const order = await createOrder(total);
  console.log(order);
  return res.json(order);
});
router.post("/order/:id", canLogOut, async (req, res, next) => {
  const { id } = req.params;
  const captureData = await capturePayment(id);
  if (captureData.status === "COMPLETED") {
    const mycart = await Cart.findOne({ owner: req.user._id }).exec();
    const promises = mycart.tickets.map(async (element) => {
      const ticket = await Ticket.findById(element).exec();
      return ticket;
    });
    let data = [];
    for await (const item of promises) {
      console.log(item);
      item.status = "completed";
      item.save();
    }

    mycart.tickets = [];
    await mycart.save();
  }
  return res.json(captureData);
});
module.exports = router;
