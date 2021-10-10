const express = require("express")
const router = express.Router()
const {Email, validate} = require("../models/email")

// get
router.get("/", async (req, res) => {
    const emails = await Email.find().sort({createdAt: -1})
    res.send(emails)
})

// get by id
router.get("/:id", async (req, res) => {
    const email = await Emails.findById(req.params.id)
    if (!email) return res.status(404).send("That email does not exist")
    res.send(email)
})

// post
router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let email = new Email(req.body)
    email = await email.save()

    res.send(email)
})

module.exports = router