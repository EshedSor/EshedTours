const mongoose = require("mongoose");
const Flight = require("../models/flight");
const Plane = require("../models/plane");

const flightsSeed = [];
mongoose
  .connect("mongodb://127.0.0.1:27017/eshedtours", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Sucess connecting to db");
  });
mongoose.set("strictQuery", false);
const cities = [
  { country: "Israel", city: "Tel Aviv", airport: "Ben Gurion" },
  { country: "United States", city: "New York", airport: "JFK" },
  { country: "United Kingdom", city: "London", airport: "Heathrow" },
  { country: "France", city: "Paris", airport: "Charles de Gaulle" },
  { country: "Spain", city: "Madrid", airport: "Barajas" },
  { country: "Germany", city: "Berlin", airport: "Tegel" },
  { country: "Italy", city: "Rome", airport: "Fiumicino" },
  { country: "Russia", city: "Moscow", airport: "Sheremetyevo" },
  { country: "China", city: "Shanghai", airport: "Pudong" },
  { country: "Japan", city: "Tokyo", airport: "Narita" },
];

Plane.find().then((planes) => {
  for (let i = 0; i < 5000; i++) {
    let origin = cities[Math.floor(Math.random() * cities.length)];
    let destination = cities[Math.floor(Math.random() * cities.length)];
    while (destination.city === origin.city) {
      destination = cities[Math.floor(Math.random() * cities.length)];
    }

    const departure = new Date();
    departure.setDate(departure.getDate() + Math.floor(Math.random() * 30));
    departure.setHours(Math.floor(Math.random() * 24));
    departure.setMinutes(Math.floor(Math.random() * 60));

    const arrival = new Date(departure);
    arrival.setHours(arrival.getHours() + Math.floor(Math.random() * 12));

    const flight = new Flight({
      origin: origin,
      destination: destination,
      departure: departure,
      arrival: arrival,
      plane: planes[Math.floor(Math.random() * planes.length)]._id,
      price: Math.floor(Math.random() * 300) + 100,
    });
    flightsSeed.push(flight);

    const returnDeparture = new Date(arrival);
    returnDeparture.setDate(
      returnDeparture.getDate() + Math.floor(Math.random() * 7)
    );
    returnDeparture.setHours(Math.floor(Math.random() * 24));
    returnDeparture.setMinutes(Math.floor(Math.random() * 60));

    const returnArrival = new Date(returnDeparture);
    returnArrival.setHours(
      returnArrival.getHours() + Math.floor(Math.random() * 12)
    );

    const returnFlight = new Flight({
      origin: destination,
      destination: origin,
      departure: returnDeparture,
      arrival: returnArrival,
      plane: planes[Math.floor(Math.random() * planes.length)]._id,
      price: Math.floor(Math.random() * 300) + 100,
    });
    flightsSeed.push(returnFlight);
  }

  console.log(flightsSeed);

  Flight.create(flightsSeed)
    .then(() => {
      console.log("Successfully seeded flights!");
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});
