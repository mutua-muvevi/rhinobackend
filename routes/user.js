const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// get
router.get("/", async (req, res) => {
  const users = await User.find().sort("-date");
  if (!users) return res.status(404).send("No users available");
  res.send(users);
});

// get by ID
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).send("No user with that Id");
  res.send(user);
});

// post
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // find is there is an existing email
  const email = await User.findOne({ email: req.body.email });
  if (email) return res.send("Email already taken, please try another");

  let user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  res.send(user);
});

// update
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // find is there is an existing email
  const email = await User.findOne({ email: req.body.email });
  if (!email) return res.status(404).send("Email doesn't, please try again");

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  // hashing the passwords
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(user);
});

// delete
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).send("User does not exist");
  res.send(user);
});

module.exports = router;
