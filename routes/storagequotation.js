const express = require("express")
const router = express.Router()
const {StorageQuotation, validate} = require("../models/storagequotation")

// get
router.get("/", async (req, res) => {
    const storagequotation = await StorageQuotation.find().sort("-date")
    res.send(storagequotation)
})

// get by id
router.get("/:id", async (req, res) => {
    const storagequotation = await StorageQuotation.findById(req.params.id)
    if (!storagequotation) return res.status(404).send("storagequotation requested with that Id does not exist")
    res.send(storagequotation)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let storagequotation = new StorageQuotation(req.body)
    storagequotation = await storagequotation.save()
    res.send(storagequotation)
})

// put
router.put("/:id", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const storagequotation = await StorageQuotation.findByIdAndUpdate(
        req.params.id, {$set : req.body}, {new: true}
    )
    if (!storagequotation) return res.status(404).send("storagequotation requested with that ID does not exist")
    res.send(storagequotation)
})

// delete
router.delete("/:id", async (req, res) => {
    const storagequotation = await StorageQuotation.findByIdAndRemove(req.params.id)
    if (!storagequotation) return res.status(404).send("storagequotation requested with that ID does not exist")
    res.send(storagequotation)
})

module.exports = router