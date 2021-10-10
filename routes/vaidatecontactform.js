const Joi = require("joi")

const validateContact = (req) => {
    const schema = Joi.object({
            fullname: Joi.string().min(5).max(100),
            email: Joi.string().min(5).max(100).email({
                minDomainSegments: 2,
                tlds: {
                    allow: ["com", "net", "org", "ke", "world", "info" ] }
                }),
            company: Joi.string().min(5).max(100),
            telephone: Joi.string().min(5).max(100),
            message: Joi.string().min(20).max(2000),
        });
    return schema.validate(req);
};
module.exports.validatContact = validateContact