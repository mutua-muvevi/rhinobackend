const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// creating the goodsschema
const goodsSchema = new Schema({
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    departure: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200
    },
    departuredate: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200
    },
    destination: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    destinationdate: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    currentlocation: {
        type: String,
        minlength: 5,
        maxlength: 255
    },
    eta: {
        // I will change to date though
        type: String,
        required: true,
    },
    description: {
        type: String,
        minlength: 20,
        maxlength: 2000,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// the goods model
const Goods = mongoose.model("goods", goodsSchema)

// input validation
const validate = (goods) => {
    const schema = Joi.object({
        title: Joi.string().min(6).max(200).required(),
        departure: Joi.string().min(6).max(200).required(),
        departuredate: Joi.string().min(6).max(200).required(),
        currentlocation: Joi.string().min(6).max(200),
        destination: Joi.string().min(6).max(200).required(),
        destinationdate: Joi.string().min(6).max(200).required(),
        quantity: Joi.number().min(1).max(1000000).required(),
        description: Joi.string().min(20).max(2000).required(),
        eta: Joi.string().min(1).required()
    })

    return schema.validate(goods)
}

// exports
module.exports.Goods = Goods
module.exports.validate = validate