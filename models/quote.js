const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// the schema
const quoteSchema = new Schema({
    fullnames: {
        type : String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    company: {
        type : String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type : String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    telephone: {
        type : String,
        required: true,
        minlength: 8,
        maxlength: 30
    },
    city: {
        type : String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    country: {
        type : String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    message: {
        type : String,
        required: true,
        minlength: 20,
        maxlength: 2000
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// the model
const Quote = mongoose.model('quote', quoteSchema)

// validation
const validate = (quote) => {
    const schema = Joi.object({
        fullnames: Joi.string().min(3).max(100).required(),
        company: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ke'] } }),
        telephone: Joi.string().min(8).max(30).required(),
        city: Joi.string().min(3).max(100).required(),
        country: Joi.string().min(3).max(100).required(),
        message: Joi.string().min(20).max(2000).required()
    })

    return schema.validate(quote)
}

module.exports.Quote = Quote 
module.exports.validate = validate
