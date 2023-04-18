const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const checkToken = (req, res) => {
  console.log("req.user", req.user);
  res.json(req.exp);
};

const dataController = {
  async create(req, res, next) {
    try {
      const user = await User.create(req.body);
      const token = createJWT(user);

      res.locals.data.user = user;
      res.locals.data.token = token;
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async login(req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log("User in controller", user);
      if (!user) throw new Error("User with that email already exists");
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error("invalid ");
      res.locals.data.user = user;
      res.locals.data.token = createJWT(user);
      next();
    } catch (error) {
      console.log("The log in error", error);
      res.status(400).json("Bad Cedentials");
    }
  },
};

const apiController = {
  auth(req, res) {
    res.json(res.locals.data.token);
  },
};

module.exports = {
  checkToken,
  dataController,
  apiController,
};

/** Helper function */

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
