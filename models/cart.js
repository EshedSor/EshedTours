const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
  owner: { type: mongoose.Types.ObjectId, ref: "Users" },
  outbound: { type: mongoose.Types.ObjectId, ref: "Flights" },
  inbound: { type: mongoose.Types.ObjectId, ref: "Flights" },
  tickets: [{ ticket: { type: mongoose.Types.ObjectId, ref: "Tickets" } }],
});

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
