const Plane = require("../models/plane");
const Flight = require("../models/flight");
module.exports.searchFlight = async (req, res, next) => {
  var { origin, destination, departure, arrival, min, max } = req.query;
  departure = new Date(departure);
  departure_next = new Date(departure);
  departure_next.setDate(departure_next.getDate() + 1);
  arrival = new Date(arrival);
  arrival_next = new Date(arrival);
  arrival_next.setDate(arrival_next.getDate() + 1);
  const toFlights = await Flight.find({
    "origin.city": origin,
    "destination.city": destination,
    departure: { $gte: departure, $lt: departure_next },
    price: { $gte: min, $lte: max },
  }).lean();
  const returnFlights = await Flight.find({
    "origin.city": destination,
    "destination.city": origin,
    departure: { $gte: arrival, $lt: arrival_next },
    price: { $gte: min, $lte: max },
  }).lean();
  return res.render("search.ejs", { toFlights, returnFlights });
};
module.exports.getCreateFlights = async (req, res, next) => {
  const planes = await Plane.find().lean();
  return res.render("flightsCreation.ejs", { planes });
};
module.exports.createFlight = async (req, res, next) => {
  try {
    const {
      origin_country,
      origin_city,
      origin_airport,
      destination_country,
      destination_city,
      destination_airport,
      arrival,
      departure,
      plane_type,
      price,
    } = req.body;
    const flight = new Flight({
      arrival: arrival,
      departure: departure,
      plane: plane_type,
      price: price,
    });
    flight.destination.country = destination_country;
    flight.destination.city = destination_city;
    flight.destination.airport = destination_airport;
    flight.origin.country = origin_country;
    flight.origin.city = origin_city;
    flight.origin.airport = origin_airport;
    flight.save();
    req.flash("success", "new flight created");
    return res.redirect("/flights/create");
  } catch (e) {
    req.flash("success", "failed to create new flight");
    return res.redirect("/");
  }
};
module.exports.getFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id) {
      const flight = await Flight.findById(id).lean();
      return res.json(flight);
    }
    return res.json("ERROR:DIDNT GET ID");
  } catch (e) {
    return res.json("ERROR:COULDNT MATCH ID");
  }
};

module.exports.getSeats = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const flight = await Flight.findById(id);
      //console.log(flight);
      const remaining = await flight.getRemainingTickets();
      //console.log(remaining);
      //console.log(flight.lean());
      return res.json(remaining);
    } else {
      return res.render("error");
    }
  } catch (e) {
    return res.send(e);
  }
};
