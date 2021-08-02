const Joi = require("joi")

module.exports.loginSchema = Joi.object({
    username: Joi.string().required().min(4).max(12),
    pass : Joi.string().required().max(12).min(8),
})