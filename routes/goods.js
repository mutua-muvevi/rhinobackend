const { Goods, validate } = require("../models/goods");
const express = require("express");
const router = express.Router();

// get all goods
router.get("/", async (req, res) => {
  const goods = await Goods.find().sort({createdAt: -1});
  if (goods) return res.status(404).send("No goods yet, Mind adding one?");
  res.send(goods);
});

// get by ID
router.get("/:id", async (req, res) => {
  const goods = await Goods.findById(req.params.id);
  if (!goods) return res.status(404).send("No goods with that ID");
  res.send(goods);
});

// positng a goods
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let goods = await new Goods(req.body).save();
  res.send(goods);
});

// updating
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const goods = await Goods.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!goods) return res.status(404).send("That goods Item does not exist");
  res.send(goods);
});

// deleting goods
router.delete("/:id", async (req, res) => {
  const goods = await Goods.findByIdAndDelete(req.params.id);
  if (!goods) return res.status(404).send("Goods with that Id does not exist");
  res.send(goods);
});

module.exports = router;
