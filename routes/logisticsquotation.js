const express = require("express")
const router = express.Router()
const {LogisticsQuotation, validate} = require("../models/logisticsquotation")

// get
router.get("/", async (req, res) => {
    const logisticsquotation = await LogisticsQuotation.find().sort({createdAt: -1})
    res.send(logisticsquotation)
})

// get by id
router.get("/:id", async (req, res) => {
    const logisticsquotation = await LogisticsQuotation.findById(req.params.id)
    if (!logisticsquotation) return res.status(404).send("logisticsquotation requested with that Id does not exist")
    res.send(logisticsquotation)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let logisticsquotation = new LogisticsQuotation(req.body)
    logisticsquotation = await logisticsquotation.save()
    res.send(logisticsquotation)
})

// put
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const logisticsquotation = await LogisticsQuotation.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true}
    )
    if (!logisticsquotation) return res.status(404).send("logisticsquotation requested with that ID does not exist")
    res.send(logisticsquotation)
})

// delete
router.delete("/:id", async (req, res) => {
    const logisticsquotation = await LogisticsQuotation.findByIdAndRemove(req.params.id)
    if (!logisticsquotation) return res.status(404).send("logisticsquotation requested with that ID does not exist")
    res.send(logisticsquotation)
})

module.exports = router