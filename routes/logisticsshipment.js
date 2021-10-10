const express = require("express")
const router = express.Router()
const {LogisticsShipment, validate} = require("../models/logisticsshipment")

// get
router.get("/", async (req, res) => {
    const logisticsshipment = await LogisticsShipment.find().sort({createdAt: -1})
    res.send(logisticsshipment)
})

// get by id
router.get("/:id", async (req, res) => {
    const logisticsshipment = await LogisticsShipment.findById(req.params.id)
    if (!logisticsshipment) return res.status(404).send("logisticsshipment requested with that Id does not exist")
    res.send(logisticsshipment)
})


// {$group: {_id: '$date', patients: {$push: {
//     patient: '$patient'
//     _id: '$_id'
// }}}},
// {$project: {date: '$_id', patients: 1, _id: 0}}

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send({message : error.details[0].message})
    
    let logisticsshipment = new LogisticsShipment(req.body)
    logisticsshipment = await logisticsshipment.save()
    res.send(logisticsshipment)
})

// put
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const logisticsshipment = await LogisticsShipment.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true}
    )
    if (!logisticsshipment) return res.status(404).send("logisticsshipment requested with that ID does not exist")
    res.send(logisticsshipment)
})

// delete
router.delete("/:id", async (req, res) => {
    const logisticsshipment = await LogisticsShipment.findByIdAndRemove(req.params.id)
    if (!logisticsshipment) return res.status(404).send("logisticsshipment requested with that ID does not exist")
    res.send(logisticsshipment)
})

module.exports = router