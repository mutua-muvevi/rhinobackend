const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// creating the activity
const brokerSchema = new Schema({
    name : {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 200
    },
    body : {
        type: String,
        minlength: 10,
        maxlength: 2000
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// the model
const Broker = mongoose.model('broker', brokerSchema)

// input validation
const validate = (broker) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(200).required(),
        body: Joi.string().min(10).max(2000)
    })

    return schema.validate(broker)
}

module.exports.Broker = Broker 
module.exports.validate = validate
