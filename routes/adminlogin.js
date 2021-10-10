const express = require("express");
const bcrypt = require("bcrypt");
const { Admin } = require("../models/admin");
const Joi = require("joi");
const router = express.Router();

//login route
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // login
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Invalid Email or Password");

  // comparing password
  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  // generating the auth token
  const token = admin.generateAdminToken();
  res.send(token);
});

// input validation
const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(100)
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org", "world", "co.ke"] },
      }),
    password: Joi.string().min(6).max(100).required(),
  });
  return schema.validate(req);
};

module.exports = router;
