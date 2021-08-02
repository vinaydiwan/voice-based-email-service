const Joi = require("joi")

module.exports.registrationSchema = Joi.object({
    fname: Joi.string().required().max(12),
    lname: Joi.string().required().max(12),
    email: Joi.string().required().email(),
    epass: Joi.string().required().max(12).min(8),
    no: Joi.string().required().length(10),
    username: Joi.string().required().min(4).max(12),
    pass : Joi.string().required().max(12).min(8),
})