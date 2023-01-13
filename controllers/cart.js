const Cart = require("../models/cart");
const Flight = require("../models/flight");
module.exports.addOutbound = async (req, res, next) => {
  console.log("herexxxxxxxxxxxxxxxxx");
  const { outbound } = req.body;
  try {
    if (outbound) {
      const flight = await Flight.findById(outbound);
      if (flight) {
        var cart = await Cart.findOneAndUpdate(
          { owner: req.user._id },
          { outbound: outbound }
        ).then((cart) => {
          return cart;
        });

        console.log(typeof cart);
        if (cart === null) {
          cart = new Cart({ owner: req.user._id });
          const newCart = await cart.save();
          cart = await Cart.findOneAndUpdate(
            { owner: req.user._id },
            { outbound: outbound }
          ).then((cart) => {
            return res.json(JSON.stringify({ _id: outbound }));
          });
        }
        return res.json(JSON.stringify({ _id: outbound }));
      }
      throw new Error("Error, No flight was found");
    }
    throw new Error("Error, No flight id provided was found");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
};
module.exports.addInbound = async (req, res, next) => {};
module.exports.getChosenFlights = async (req, res, next) => {};
module.exports.addTicketToCart = async (req, res, next) => {};
module.exports.removeTicketFromCart = async (req, res, next) => {};
