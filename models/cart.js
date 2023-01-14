const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Ticket = require("../models/ticket");
const Flight = require("../models/flight");
const cartSchema = new schema(
  {
    owner: { type: mongoose.Types.ObjectId, ref: "Users" },
    outbound: { type: mongoose.Types.ObjectId, ref: "Flights" },
    inbound: { type: mongoose.Types.ObjectId, ref: "Flights" },
    tickets: [{ ticket: { type: mongoose.Types.ObjectId, ref: "Tickets" } }],
  },
  {
    methods: {
      cartTotal() {
        var total = 0;
        const promises = this.tickets.map(async (element) => {
          const ticket = await Ticket.findById(element).lean();
          const flight = await Flight.findById(ticket.flight).lean();
          return { ticket, flight };
        });
        for await (const item of promises) {
          total+= item.price;
        }
        console.log(total);
        return total;
      },
    },
  }
);

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
