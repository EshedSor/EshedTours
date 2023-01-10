const mongoose = require("mongoose");
const { INTEGER } = require("sequelize");
const Plane = require("./plane");
const Ticket = require("./ticket");
const schema = mongoose.Schema;

const flightSchema = new schema(
  {
    origin: {
      country: {
        type: "String",
        required: true,
      },
      city: {
        type: "String",
        required: true,
      },
      airport: {
        type: "String",
        required: true,
      },
    },
    destination: {
      country: {
        type: "String",
        required: true,
      },
      city: {
        type: "String",
        required: true,
      },
      airport: {
        type: "String",
        required: true,
      },
    },
    departure: {
      type: Date,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    plane: { type: mongoose.Types.ObjectId, ref: "Planes" },
    price: { type: "Number", required: true },
  },
  {
    methods: {
      getDepartureTime() {},
      getArrivalTime() {},
      async getRemainingTickets() {
        try {
          const plane = await Plane.findById(this.plane);
          var allSeats = [...Array(plane.seats).keys()];
          var takenSeats = await this.getSoldTickets();
          const freeSeats = allSeats.filter((word) => !(word in takenSeats));
          //console.log(JSON.stringify(freeSeats));
          return JSON.stringify(freeSeats);
        } catch (e) {
          console.log(e);
        }
      },
      getPlaneSize() {},
      async getSoldTickets() {
        var soldTickets = [];
        const sold = await Ticket.find({ flight: this._id }, "seat").lean();
        sold.forEach((element) => soldTickets.push(element));
        return soldTickets;
      },
    },
  }
);
/*flightSchema.methods.getRemainingTickets = async () => {
  const plane = await Plane.findbyid(this.plane);
  console.log("plane " + plane.lean());
  var allSeats = [...Array(plane.size).keys()];
  var takenSeats = this.getSoldTickets();
  const freeSeats = allSeats.filter((word) => !(word in takenSeats));
};
flightSchema.methods.getSoldTickets = async () => {
  var soldTickets = [];
  const sold = await Ticket.find({ flight: this._id }, "seat").lean();
  sold.forEach((element) => soldTickets.push(element));
  return soldTickets;
};*/
const Flight = mongoose.model("Flights", flightSchema);

module.exports = Flight;
