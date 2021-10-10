const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// the storagequotationschema
const storageQuotationSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    fullnames: {
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
        minLength: 2,
        maxLength: 100
    },
    email: {
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
    country: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    city: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
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
        min: 1,
        max: 5000000000
    },
    producttype: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100
    },
    storagecity: {
        type: String,
        required: true,
        minLength:3,
        maxLength: 100
    },
    storagecountry: {
        type: String,
        required: true,
        minLength:3,
        maxLength: 100
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
const StorageQuotation = mongoose.model("Storage Quotation", storageQuotationSchema)

// validation
const validate = (storagequotation) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        fullnames: Joi.string().min(3).max(100).required(),
        company: Joi.string().min(3).max(100).required(),
        position: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(3).max(100).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ke'] } }),
        unit: Joi.string().min(1).max(10).required(),
        weight: Joi.number().min(1).max(5000000000).required(),
        country: Joi.string().min(3).max(100).required(),
        city: Joi.string().min(3).max(100).required(),
        productname: Joi.string().min(3).max(100).required(),
        quantity: Joi.number().min(1).max(5000000000).required(),
        producttype: Joi.string().min(3).max(100).required(),
        storagecity: Joi.string().min(3).max(100).required(),
        storagecountry: Joi.string().min(1).max(100).required(),
        description: Joi.string().min(20).max(2000).required()
    })

    return schema.validate(storagequotation)
}

module.exports.StorageQuotation = StorageQuotation 
module.exports.validate = validate