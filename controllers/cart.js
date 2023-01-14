const Cart = require("../models/cart");
const Flight = require("../models/flight");
const Ticket = require("../models/ticket");
module.exports.addOutbound = async (req, res, next) => {
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
module.exports.addInbound = async (req, res, next) => {
  const { inbound } = req.body;
  try {
    if (inbound) {
      const flight = await Flight.findById(inbound);
      if (flight) {
        var cart = await Cart.findOneAndUpdate(
          { owner: req.user._id },
          { inbound: inbound }
        ).then((cart) => {
          return cart;
        });

        console.log(typeof cart);
        if (cart === null) {
          cart = new Cart({ owner: req.user._id });
          const newCart = await cart.save();
          cart = await Cart.findOneAndUpdate(
            { owner: req.user._id },
            { inbound: inbound }
          ).then((cart) => {
            return res.json(JSON.stringify({ _id: inbound }));
          });
        }
        return res.json(JSON.stringify({ _id: inbound }));
      }
      throw new Error("Error, No flight was found");
    }
    throw new Error("Error, No flight id provided was found");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Error");
  }
};
module.exports.getChosenFlightId = async (req, res, next) => {
  try {
    const myflights = await Cart.find(
      { owner: req.user._id },
      "outbound inbound"
    ).lean();
    return res.json(JSON.stringify(myflights));
  } catch (e) {
    console.log(e);
    res.status(404);
    return res.json(e);
  }
};
module.exports.getMyTickets = async (req, res, next) => {
  try {
    const mycart = await Cart.findOne({ owner: req.user._id })
      .populate("tickets")
      .lean();
    let data = [];
    if (mycart) {
      const promises = mycart.tickets.map(async (element) => {
        const ticket = await Ticket.findById(element).lean();
        const flight = await Flight.findById(ticket.flight).lean();
        return { ticket, flight };
      });
      let data = [];
      for await (const item of promises) {
        data.push(item);
      }
      return res.json(JSON.stringify(data));
    }
  } catch (e) {
    console.log(e);
    res.status(404);
    return res.json(e);
  }
};
module.exports.removeTicketFromCart = async (req, res, next) => {};
