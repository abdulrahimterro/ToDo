const Joi = require("joi");
const joi = require("joi");
const { commonValidators } = require("../../../utils");

module.exports = {
    signup: joi.object({
        body: joi.object({
            username: joi.string().required(),
            password: commonValidators.password,
            email: Joi.string().email().required(),
            dateBirth: joi.date().max(Date.now()),
            city: joi.string(),
            street: joi.string()
        })
    }),
    login: joi.object({
        body: joi.object({
            username: joi.string().required(),
            password: joi.string().required()
        })
    })
}