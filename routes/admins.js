const { Admin, validate } = require("../models/admin");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// get
router.get("/", async (req, res) => {
  const admins = await Admin.find().sort("-date");
  res.send(admins);
});

// get by id
router.get("/:id", async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  if (!admin) return res.status(404).send("user does not exist");
  res.send(admin);
});

// post
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // cheking if a given admin exists
  const email = await Admin.findOne({ email: req.body.email });
  if (email) return res.status(400).send({ message: "user already exist" });

	//   checking if a given users id exists
	const idno = await Admin.findOne({ idno: req.body.idno })
	if (idno) return res.status(400).send({message: "user with that identification number exists"})

  let admin = new Admin(req.body);
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(req.body.password, salt);
  admin = await admin.save();

  const token = admin.generateAdminToken();
  res.header("x-auth-token", token).send(admin);
});

// update
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);

  await admin.save();

  if (!admin) return res.status(404).send("That user does not exist");
  res.header("x-auth-token").send(admin);
});

// delete
router.delete("/:id", async (req, res) => {
  const admin = await Admin.findByIdAndRemove(req.params.id);
  if (!admin) return res.status(404).send("That user does not exist");
  res.send(admin);
});

module.exports = router;
