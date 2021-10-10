const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// the storageShipmentSchema
const storageShipmentSchema = new Schema({
	fullnames: {
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
	shipaddress: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	consignfullnames: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	consignemail: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	consignaddress: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	consigncompany: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	storagecity: {
		type: String,
		required: true,
		minLength:3,
		maxLength: 50
	},
	storagecountry: {
		type: String,
		required: true,
		minLength:3,
		maxLength: 50
	},
	warehousetype: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	weight: {
		type: Number,
		required: true,
		min: 1,
		max: 50000000
	},
	weightunit: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 50
	},
	producttype: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50
	},
	pieces: {
		type: Number,
		required: true,
		min: 1,
		max: 50000000
	},
	datein: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	intime: {
		type: String,
		required: true,
		min: 3,
		max: 100
	},
	dateout: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	outtime: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	trackno: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	idno: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 30
	},
	quality: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	product: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	packaging: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	observation: {
		type: String,
		minLength: 0,
		maxLength: 2000
	},
	collectoraddress: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	collectortel: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	collectedby: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	notes: {
		type: String,
		required: true,
		minLength: 10,
		maxLength: 100
	},
	date: {
		type: Date,
		default: Date.now
	}
}, {
	timestamps: true
})

// the model
const StorageShipment = mongoose.model("Storage", storageShipmentSchema)

// validation
const validate = (storageShipment) => {
	const schema = Joi.object({
		fullnames: Joi.string().min(3).max(100).required(),
		email: Joi.string().min(3).max(100).required().email(),
			// .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ke'] } }),
		company: Joi.string().min(3).max(100).required(),
		shipaddress: Joi.string().min(3).max(100).required(),
		consignfullnames: Joi.string().min(3).max(100).required(),
		consignemail: Joi.string().min(3).max(100).required(),
		consigncompany: Joi.string().min(3).max(100).required(),
		consignaddress: Joi.string().min(3).max(100).required(),
		storagecity: Joi.string().min(3).max(50).required(),
		storagecountry: Joi.string().min(3).max(50).required(),
		warehousetype: Joi.string().min(3).max(50).required(),
		weight: Joi.number().min(1).max(50000000).required(),
		weightunit: Joi.string().min(1).max(100).required(),
		producttype: Joi.string().min(3).max(50).required(),
		pieces: Joi.number().min(1).max(50000000).required(),
		datein: Joi.string().min(3).max(100).required(),
		intime: Joi.string().min(3).max(100).required(),
		dateout: Joi.string().min(3).max(100).required(),
		outtime: Joi.string().min(3).max(100).required(),
		trackno: Joi.string().min(3).max(100).required(),
		idno: Joi.string().min(5).max(30).required(),
		quality: Joi.string().min(3).max(100).required(),
		product: Joi.string().min(3).max(100).required(),
		packaging: Joi.string().min(3).max(100).required(),
		collectoraddress: Joi.string().min(3).max(100),
		collectortel: Joi.string().min(3).max(100),
		collectedby: Joi.string().min(3).max(100),
		notes: Joi.string().min(10).max(100).required(),
		observation: Joi.string().min(0).max(2000)
	})

	return schema.validate(storageShipment)
}

module.exports.StorageShipment = StorageShipment 
module.exports.validate = validate