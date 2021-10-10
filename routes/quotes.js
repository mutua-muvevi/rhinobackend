const express = require("express")
const router = express.Router()
const {Quote, validate} = require("../models/quote")

// get
router.get("/", async (req, res) => {
    const quotes = await Quote.find().sort("-date")
    res.send(quotes)
})

// get by id
router.get("/:id", async (req, res) => {
    const quotes = await Quotes.findById(req.params.id)
    if (!quotes) return res.status(404).send("Quote requested with that Id does not exist")
    res.send(quotes)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let quote = new Quote(req.body)
    quote = await quote.save()
    res.send(quote)
})

// put
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const quotes = await Quotes.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true}
    )
    if (!quotes) return res.status(404).send("Quote requested with that ID does not exist")
    res.send(quotes)
})

// delete
router.delete("/:id", async (req, res) => {
    const quotes = await Quotes.findByIdAndRemove(req.params.id)
    if (!quotes) return res.status(404).send("Quote requested with that ID does not exist")
    res.send(quotes)
})

module.exports = router