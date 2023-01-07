const mongoose = require("mongoose");
const schema = mongoose.Schema;

const planeSchema = new schema({
  seats: { type: Number, require: true },
  _type: { type: String, require: true },
});
const Plane = mongoose.model("Planes", planeSchema);

module.exports = Plane;
