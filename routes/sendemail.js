const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/mailer")
const {validatContact} = require("./vaidatecontactform")

//sign up
router.post("/", async (req, res) => {
	const { error } = validatContact(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {fullname, email, company, telephone, message} = req.body
	// input validation
	sendEmail(fullname, email, company, telephone, message, (err, data) => {
		if (err) {
			res.status(500).send("Internal Error")
		} else {
			res.send("Message sent successfully")
		}
	})

});

module.exports = router;
