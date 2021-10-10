const express = require("express")
const router = express.Router()
const {Client, validate} = require('../models/client')

// get
router.get('/', async (req, res) => {
    const clients = await Client.find().sort("-date")
    if (!clients) return res.status(404).send("No Clients yet, Register one?")
    res.send(clients)
})

// get by id
router.get("/:id", async (req, res) => {
    const client = await Client.findById(req.params.id)
    if (!client) return res.status(40).send("Client with that Id does not exist")
    res.send(client)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let client = new Client(req.body)
    client = await client.save()
    res.send(client)
})

// update
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const client = await Client.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true} 
    )

    if (!client) return res.status(404).send("Client with that given ID doesnt exist")
    res.send(client)
})

// delete
router.delete("/:id", async (req, res) => {
    const client = await Client.findByIdAndRemove(req.params.id)
    if (!client) return res.status(404).send("Client with that given ID doesnt exist")
    res.send(client)
})

module.exports = router