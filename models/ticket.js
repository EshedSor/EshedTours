const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ticketSchema = new schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    passportID: { type: String, required: true },
    price: { type: Number },
    seat: { type: Number },
    owner: { type: mongoose.Types.ObjectId, ref: "Users" },
    flight: { type: mongoose.Types.ObjectId, ref: "Flights" },
    status: { type: String, default: "pending" },
  },
  {
    methods: {},
  }
);

const Ticket = mongoose.model("Tickets", ticketSchema);

module.exports = Ticket;
