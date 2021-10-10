const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const Joi = require("joi");
const router = express.Router();

//login route
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // login
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  // comparing password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  res.send(true);
});

// input validation
const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(7)
      .max(100)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
    password: Joi.string()
      .min(8)
      .max(100)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return schema.validate(req);
};

module.exports = router;
