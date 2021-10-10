const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema
const jwt = require("jsonwebtoken")
const config = require("config")

// creating the activity
const userSchema = new Schema({
    title: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    firstname: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    lastname: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    idno: {
        type: String,
        minLength: 8,
        maxLength: 100,
        required: true
    },
    email: {
        type: String,
        minLength: 7,
        maxLength: 100,
        required: true
    },
    telephone: {
        type: String,
        minLength: 10,
        maxLength: 30,
        required: true
    },
    pobox: {
        type: String,
        minLength: 4,
        maxLength: 100,
        required: true
    },
    city: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    country: {
        type: String,
        minLength: 3,
        maxLength: 100,
        required: true
    },
    role: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 2000,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

// creating the tokens
userSchema.methods.generateAdminToken = function() {
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'))
    return token
}

// the model
const User = mongoose.model('user', userSchema)

// input validation
const validate = (user) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(100).required(),
        firstname: Joi.string().min(3).max(100).required(),
        lastname: Joi.string().min(3).max(100).required(),
        idno: Joi.string().min(8).max(100).required(),
        email: Joi.string().min(7).max(100).email().required(),
        telephone: Joi.string().min(10).max(30).required(),
        pobox: Joi.string().min(5).max(100).required(),
        city: Joi.string().min(3).max(100).required(),
        country: Joi.string().min(3).max(100).required(),
        role: Joi.string().min(2).max(100).required(),
        password: Joi.string().min(6).max(100).required(),
    })

    return schema.validate(user)
}

module.exports.User = User 
module.exports.validate = validate
