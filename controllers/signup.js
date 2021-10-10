const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

//sign up
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // find is there is an existing email
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.send("Email already taken, please try another");

  let user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user.save();
  res.send(user);
});

module.exports = router;
