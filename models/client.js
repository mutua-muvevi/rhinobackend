const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// creating the activity
const clientSchema = new Schema({
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
const Client = mongoose.model('client', clientSchema)

// input validation
const validate = (client) => {
    const schema = Joi.object({
        name: Joi.string().min(4).max(200).required(),
        body: Joi.string().min(10).max(2000)
    })

    return schema.validate(client)
}

module.exports.Client = Client 
module.exports.validate = validate
