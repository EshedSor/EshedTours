const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
  owner: { type: mongoose.Types.ObjectId, ref: "Users" },
  tickets: [{ ticket: { type: mongoose.Types.ObjectId, ref: "Tickets" } }],
});

const User = mongoose.model("Carts", cartSchema);

module.exports = User;
