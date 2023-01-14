var express = require("express");
var router = express.Router();
const User = require("../models/user");
const Ticket = require("../models/ticket");
const Cart = require("../models/cart");
const Flight = require("../models/flight");
const { isLoggedIn, canLogOut } = require("../middleware");

router.post("/checkout", (req, res) => {
  const mycart = Cart.findOne({ owner: req.user._id });
  const total = mycart.cartTotal();
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5555/cart",
      cancel_url: "http://localhost:5555/",
    },
    transactions: [
      {
        item_list: {
          items: [],
        },
        amount: {
          currency: "USD",
          total: total,
        },
        description: "This is the payment description.",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

module.exports = router;
