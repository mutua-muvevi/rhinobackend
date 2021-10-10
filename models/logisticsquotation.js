const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// the logisticsQuotationSchema
const logisticsQuotationSchema = new Schema({
    title : {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    firstname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    lastname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    company: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    position: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    unit: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 10
    },
    weight: {
        type: Number,
        required: true,
        min: 1,
        max: 5000000000
    },
    producttype: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    fromcity: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    fromcountry: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    pieces: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 5000000000
    },
    productname: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    quantity: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 5000000000
    },
    merchandise: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    logisticstype: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    tocity: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    tocountry: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 2000
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// the model
const LogisticsQuotation= mongoose.model("Logistics Quotation", logisticsQuotationSchema)

// validation
const validate = (logisticsquotation) => {
    const schema = Joi.object({
        firstname: Joi.string().min(3).max(100).required(),
        lastname: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ke'] } }),
        title: Joi.string().min(2).max(100).required(),
        company:  Joi.string().min(3).max(100).required(),
        position: Joi.string().min(3).max(100).required(),
        unit: Joi.string().min(1).max(10).required(),
        weight: Joi.number().min(1).max(5000000000).required(),
        producttype: Joi.string().min(3).max(100).required(), //solid liquid gass etc
        fromcity: Joi.string().min(3).max(50).required(),
        fromcountry: Joi.string().min(3).max(50).required(),
        pieces: Joi.number().min(1).max(5000000000).required(),
        productname: Joi.string().min(3).max(100).required(),
        quantity: Joi.number().min(1).max(5000000000).required(),
        merchandise: Joi.string().min(3).max(100).required(),
        logisticstype: Joi.string().min(3).max(100).required(),
        tocity: Joi.string().min(3).max(50).required(),
        tocountry: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(2000).required(),
    })

    return schema.validate(logisticsquotation)
}

module.exports.LogisticsQuotation = LogisticsQuotation 
module.exports.validate = validate