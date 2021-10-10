const mongoose = require("mongoose")
const Joi = require("joi")
const Schema = mongoose.Schema

// the productquotationschema
const productQuotationSchema = new Schema({
	company: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	fullnames: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	title: {
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
	position: {
		type: String,
		required: true,
		minLength: 2,
		maxLength: 100
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
	product: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
		max: 50000000000
	},
	packaging: {
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
		max: 50000000000
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
const ProductQuotation = mongoose.model("Product Quotation", productQuotationSchema)

// validation
const validate = (productquotation) => {
	const schema = Joi.object({
		company: Joi.string().min(3).max(100).required(),
		fullnames: Joi.string().min(3).max(100).required(),
		title: Joi.string().min(2).max(100).required(),
		email: Joi.string().min(3).max(100).required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'ke', 'world'] } }),
		position: Joi.string().min(3).max(100).required(),
		city: Joi.string().min(3).max(100).required(),
		country: Joi.string().min(3).max(100).required(),
		product: Joi.string().min(3).max(100).required(),
		quantity: Joi.number().min(1).max(50000000000).required(),
		packaging: Joi.string().min(3).max(100).required(),
		unit: Joi.string().min(1).max(10).required(),
		weight: Joi.number().min(1).max(50000000000).required(),
		description: Joi.string().min(20).max(2000).required()
	})

	return schema.validate(productquotation)
}

module.exports.ProductQuotation = ProductQuotation 
module.exports.validate = validate