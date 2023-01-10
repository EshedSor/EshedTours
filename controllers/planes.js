const Plane = require("../models/plane");
module.exports.getAllPlanes = async (req, res, next) => {
  const planeQuery = await Plane.find({}).lean();
  return res.render("planes.ejs", { planeQuery });
};
module.exports.getPlane = async (req, res) => {
  try {
    const { id } = req.params;
    const plane = await Plane.findById(id).lean();
    if (plane) {
      return res.render("planeEdit.ejs", { plane });
    } else {
      return res.send("plane not found");
    }
  } catch (e) {
    return res.send("plane not found");
  }
};
module.exports.updatePlane = async (req, res, next) => {
  const { id } = req.params;
  const { _type, seats } = req.body;
  const user = await Plane.findByIdAndUpdate(id, {
    _type: _type,
    seats: seats,
  });
  res.redirect("/planes/" + id);
};
module.exports.createPlane = async (req, res, next) => {
  //destructuring body
  try {
    const { seats, _type } = req.body;
    const plane = await Plane.create({ seats, _type });
    req.flash("success", "new plane created");
    return res.redirect("/planes");
  } catch (e) {
    req.flash("success", "plane creation failed");
    return res.redirect("/");
  }
};
