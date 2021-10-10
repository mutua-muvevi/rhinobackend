const {Broker, validate} = require("../models/broker")
const express = require("express")
const router = express.Router()

// get
router.get('/', async (req, res) => {
    const brokers = await Broker.find().sort("-date")
    res.send(brokers)
})

// get by id
router.get("/:id", async (req, res) => {
    const broker = await Broker.findById(req.params.id)
    if (!broker) return res.status(404).send("broker with that Id does not exist")
    res.send(broker)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let broker = new Broker(req.body)
    broker = await broker.save()
    res.send(broker)
})

// update
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const broker = await Broker.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true} 
    )

    if (!broker) return res.status(404).send("broker with that given ID doesnt exist")
    res.send(broker)
})

// delete
router.delete("/:id", async (req, res) => {
    const broker = await Broker.findByIdAndRemove(req.params.id)
    if (!broker) return res.status(404).send("broker with that given ID doesnt exist")
    res.send(broker)
})

module.exports = router