const User = require("../models/user");
const Cart = require("../models/cart");
module.exports.getAllUsers = async (req, res, next) => {
  const userQuery = await User.find({})
    .select({ name: 1, surname: 1, email: 1, _id: 1 })
    .lean();
  return res.send(userQuery);
};

module.exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select({ name: 1, surname: 1, email: 1, _id: 0 })
      .lean();
    if (user) {
      return res.send(user);
    } else {
      return res.send("User not found");
    }
  } catch (e) {
    return res.send("User not found");
  }
};

module.exports.createUser = async (req, res, next) => {
  //destructuring body
  try {
    const { name, surname, email, password } = req.body;
    const user = new User({ name, surname, email });
    const registered = await User.register(user, password);
    //creates an empty cart
    const cart = new Cart({ owner: user._id });
    const newCart = await cart.save();
    //
    req.flash("success", "Welcome to Eshedtours");
    return res.redirect("/");
  } catch (e) {
    req.flash("success", "Email already in use");
    return res.redirect("../register");
  }
};

module.exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, surname, email } = req.body;
  const user = await User.findByIdAndUpdate(id, {
    name: name,
    surname: surname,
    email: email,
  });
  res.redirect("/settings");
};

module.exports.deleteUser = async (req, res, next) => {};
