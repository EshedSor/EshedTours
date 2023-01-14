const mongoose = require("mongoose");
const Plane = require("../models/plane");

const planesSeed = [
  { seats: 150, _type: "Boeing 737" },
  { seats: 220, _type: "Airbus A320" },
  { seats: 42, _type: "Cessna 172" },
  { seats: 100, _type: "Embraer E190" },
  { seats: 50, _type: "Piper PA-28" },
  { seats: 180, _type: "Boeing 757" },
  { seats: 285, _type: "Airbus A380" },
  { seats: 70, _type: "Bombardier CRJ700" },
  { seats: 90, _type: "Embraer E175" },
  { seats: 40, _type: "Cessna 208" },
  { seats: 200, _type: "Boeing 747" },
  { seats: 110, _type: "Embraer E195" },
  { seats: 60, _type: "Piper PA-44" },
  { seats: 160, _type: "Boeing 767" },
  { seats: 240, _type: "Airbus A330" },
  { seats: 30, _type: "Cessna 150" },
  { seats: 130, _type: "Embraer E170" },
  { seats: 80, _type: "Bombardier CRJ900" },
  { seats: 40, _type: "Piper PA-32" },
  { seats: 170, _type: "Boeing 777" },
  { seats: 260, _type: "Airbus A350" },
  { seats: 35, _type: "Cessna 182" },
  { seats: 120, _type: "Embraer E190-E2" },
  { seats: 75, _type: "Bombardier CRJ550" },
];

mongoose
  .connect("mongodb://127.0.0.1:27017/eshedtours", { useNewUrlParser: true })
  .then(() => {
    Plane.create(planesSeed)
      .then(() => {
        console.log("Successfully seeded planes!");
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log(err);
        mongoose.connection.close();
      });
  });
