const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

// the logisticsShipmentSchema
const logisticsShipmentSchema = new Schema(
  {
	fullnames: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	email: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	company: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	shipaddress: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	consignfullnames: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	consignemail: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	consigncompany: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	consignaddress: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	departurecity: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	departurecountry: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	arrivalcity: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	arrivalcountry: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	logisticstype: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	weight: {
		type: Number,
		required: true,
		min: 1,
		max: 50000000,
	},
	weightunit: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 50,
	},
	producttype: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 50,
	},
	pieces: {
		type: Number,
		required: true,
		min: 1,
		max: 50000000,
	},
	departuredate: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	departuretime: {
		type: String,
		required: true,
		min: 3,
		max: 100,
	},
	arrivaltime: {
		type: String,
		min: 3,
		max: 100,
	},
	quality: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
	arrivaldate: {
		type: String,
		required: true,
		min: 3,
		max: 100,
	},
	trackno: {
		type: String,
		required: true,
		min: 3,
		max: 100,
	},
	idno: {
		type: String,
		required: true,
		min: 5,
		max: 30,
	},
	notes: {
		type: String,
		required: true,
		minLength: 20,
		maxLength: 2000,
	},
	timeevents: {
		type: String,
		required: true,
		min: 4,
		max: 10,
	},
	unit: {
		type: String,
		required: true,
		min: 2,
		max: 100,
	},
	completed: {
		type: Boolean
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
	product: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	currentlocation: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	status: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	currentdate: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	date: {
		type: Date,
		default: Date.now,
	},
  },
  {
	timestamps: true,
  }
);

// the model
const LogisticsShipment = mongoose.model("Shipment records", logisticsShipmentSchema);

// validation
const validate = (logisticsShipment) => {
  const schema = Joi.object({
	fullnames: Joi.string().min(3).max(100).required(),
	email: Joi.string()
		.min(3)
		.max(100)
		.required()
		.email({
			minDomainSegments: 2,
			// tlds: { allow: ["com", "net", "org", "ke"] },
		}),
	company: Joi.string().min(3).max(100).required(),
	shipaddress: Joi.string().min(3).max(100).required(),
	consignfullnames: Joi.string().min(3).max(100).required(),
	consignemail: Joi.string().min(3).max(100).required(),
	consigncompany: Joi.string().min(3).max(100).required(),
	consignaddress: Joi.string().min(3).max(100).required(),
	departurecity: Joi.string().min(3).max(50).required(),
	departurecountry: Joi.string().min(3).max(50).required(),
	arrivalcity: Joi.string().min(3).max(50).required(),
	arrivalcountry: Joi.string().min(3).max(50).required(),
	logisticstype: Joi.string().min(3).max(50).required(),
	weight: Joi.number().min(1).max(50000000).required(),
	weightunit: Joi.string().min(1).max(100).required(),
	producttype: Joi.string().min(3).max(50).required(),
	pieces: Joi.number().min(1).max(50000000).required(),
	departuredate: Joi.string().min(3).max(100).required(),
	departuretime: Joi.string().min(3).max(100).required(),
	arrivaldate: Joi.string().min(3).max(100).required(),
	quality: Joi.string().min(3).max(100).required(),
	trackno: Joi.string().min(3).max(100).required(),
	idno: Joi.string().min(5).max(30).required(),
	timeevents: Joi.string().min(4).max(10).required(),
	arrivaltime: Joi.string().min(4).max(10),
	collectoraddress: Joi.string().min(3).max(100),
	collectortel: Joi.string().min(3).max(100),
	collectedby: Joi.string().min(3).max(100),
	currentlocation: Joi.string().min(3).max(100),
	product: Joi.string().min(3).max(100),
	currentdate: Joi.string().min(3).max(100),
	status: Joi.string().min(3).max(100).required(),
	completed: Joi.boolean(),
	unit: Joi.string().min(2).max(100).required(),
	notes: Joi.string().min(20).max(2000).required(),
  });

  return schema.validate(logisticsShipment);
};

module.exports.LogisticsShipment = LogisticsShipment;
module.exports.validate = validate;
