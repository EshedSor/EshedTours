const User = require("../models/user");
const Ticket = require("../models/ticket");
const Cart = require("../models/cart");
const Flight = require("../models/flight");
module.exports.getTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).lean();
    if (ticket) {
      if (ticket.owner === req.user._id) {
        return res.json(JSON.stringify(ticket));
      } else {
        res.status(403);
        return res.json("Error:You are not the ticket owner");
      }
    }
    res.status(404);
    return res.json("Error:no ticket found with this id");
  } catch (e) {
    console.log(e);
    res.status(404);
    return res.json(JSON.stringify(e));
  }
};
module.exports.createTicket = async (req, res, next) => {
  try {
    const { flightid, name, surname, passportid, seat } = req.body;
    const flight = Flight.findById(flightid).lean();
    if (flight) {
      const checkseat = await Ticket.find({ flight: flightid, seat: seat });
      if (checkseat.length === 0) {
        const ticket = new Ticket({
          name: name,
          surname: surname,
          passportID: passportid,
          price: flight.price,
          owner: req.user._id,
          seat: seat,
          flight: flightid,
        });
        const createdTicket = await ticket.save();
        if (createdTicket) {
          const cart = await Cart.findOne({ owner: req.user._id });
          if (cart) {
            cart.tickets.push(createdTicket._id);
            cart.save();
            res.status(201);
            return res.json("Success:Created");
          }
          res.status(404);
          return res.json("Error:Cart not found");
        }
        res.status(404);
        return res.json("Error:Ticket couldnt be created");
      }

      res.status(404);
      return res.json("Error:seat taken");
    }

    res.status(404);
    return res.json("Error:Flight not found");
  } catch (e) {
    console.log(e);
    res.status(404);
    return res.json(JSON.stringify(e));
  }
};

module.exports.deleteTicket = async (req, res, next) => {
  try {
    const { id } = req.params;
    var mycart = await Cart.findOne({ owner: req.user._id });
    mycart.tickets = await mycart.tickets.filter((ticketid) => {
      console.log("id" + ticketid._id);
      return ticketid._id != id;
    });
    await mycart.save();
    await Ticket.findOneAndRemove({
      _id: id,
      owner: req.user._id,
      status: "pending",
    });
    return res.json("Success");
  } catch (e) {
    console.log(e);
    res.status(404);
    return res.json(e);
  }
};

module.exports.getHistory = async (req, res, next) => {
  try {
    const history = await Ticket.find({
      owner: req.user._id,
      status: "completed",
    }).lean();
    console.log(history);
    if (history) {
      const promises = history.map(async (ticket) => {
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
