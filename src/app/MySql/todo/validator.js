const joi = require("joi");
const { commonValidators } = require("../../../utils/");

module.exports = {
    add: joi.object({
        body: joi.object({
            title: joi.string(),
            data: joi.string().required(),
            completed: joi.boolean()
        })
    }),
    find: joi.object({
        params: joi.object({
            id: joi.string()
        })
    }),
    delete: joi.object({
        params: joi.object({
            id: joi.string()
        })
    }),
    update: joi.object({
        body: joi.object({
            id: commonValidators.id,
            title: joi.string(),
            data: joi.string(),
            completed: joi.boolean(),
        })
    })
}