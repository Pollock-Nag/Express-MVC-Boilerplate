const User = require("../models/User");

async function listUsers(req, res, next) {
  try {
    const users = await User.find().sort({ name: 1 });
    res.render("users", { title: "Users", users });
  } catch (error) {
    next(error);
  }
}

module.exports = { listUsers };
