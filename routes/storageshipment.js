const express = require("express")
const router = express.Router()
const {StorageShipment, validate} = require("../models/storageshipment")

// get
router.get("/", async (req, res) => {
    const storageshipment = await StorageShipment.find().sort("-date")
    res.send(storageshipment)
})

// get by id
router.get("/:id", async (req, res) => {
    const storageshipment = await StorageShipment.findById(req.params.id)
    if (!storageshipment) return res.status(404).send("storageshipment requested with that Id does not exist")
    res.send(storageshipment)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let storageshipment = new StorageShipment(req.body)
    storageshipment = await storageshipment.save()
    res.send(storageshipment)
})

// put
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const storageshipment = await StorageShipment.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true}
    )
    if (!storageshipment) return res.status(404).send("storageshipment requested with that ID does not exist")
    res.send(storageshipment)
})

// delete
router.delete("/:id", async (req, res) => {
    const storageshipment = await StorageShipment.findByIdAndRemove(req.params.id)
    if (!storageshipment) return res.status(404).send("storageshipment requested with that ID does not exist")
    res.send(storageshipment)
})

module.exports = router