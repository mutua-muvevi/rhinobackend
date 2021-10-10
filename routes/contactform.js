const express = require("express")
const router = express.Router()
const sendEmail = require("../utils/mailer.js") 

//login route
router.post("/sendmail", async (req, res) => {
    sendEmail(req.body)
    res.send(true);
  });
  

  
  module.exports = router;