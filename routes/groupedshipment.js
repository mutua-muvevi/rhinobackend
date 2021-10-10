const express = require("express")
const router = express.Router()
const {LogisticsShipment, validate} = require("../models/logisticsshipment")


// get by id
router.get("/grouped", async (req, res) => {
    const logisticsshipment = await LogisticsShipment.find()
        .sort({createdAt: -1})
        .aggregate([
            { $match: match },
            {
              $group: {
                _id: {
                    body: logisticsshipment
                }
              }
            }
          ])
    res.send(logisticsshipment)
})

module.exports = router