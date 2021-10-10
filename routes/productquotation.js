const express = require("express")
const router = express.Router()
const {ProductQuotation, validate} = require("../models/productquotation")

// get
router.get("/", async (req, res) => {
    const productquotation = await ProductQuotation.find().sort("-date")
    res.send(productquotation)
})

// get by id
router.get("/:id", async (req, res) => {
    const productquotation = await ProductQuotation.findById(req.params.id)
    if (!productquotation) return res.status(404).send("productquotation requested with that Id does not exist")
    res.send(productquotation)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let productquotation = new ProductQuotation(req.body)
    productquotation = await productquotation.save()
    res.send(productquotation)
})

// put
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const productquotation = await ProductQuotation.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true}
    )
    if (!productquotation) return res.status(404).send("productquotation requested with that ID does not exist")
    res.send(productquotation)
})

// delete
router.delete("/:id", async (req, res) => {
    const productquotation = await ProductQuotation.findByIdAndRemove(req.params.id)
    if (!productquotation) return res.status(404).send("productquotation requested with that ID does not exist")
    res.send(productquotation)
})

module.exports = router