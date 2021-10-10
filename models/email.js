const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// the email schema
const emailSchema = new Schema({
    email: {
        type: String,
        minlength: 6,
        maxlength: 100
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// the model
const Email = mongoose.model("email", emailSchema)

// validation
const validate = (email) => {
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).min(6).max(100)
    })

    return schema.validate(email)
}

// exports
module.exports.Email = Email
module.exports.validate = validate