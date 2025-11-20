const Joi = require('joi');
const validator = require('@middleware/validator');

module.exports.loginValidator = validator(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
}));

module.exports.registerValidator = validator(
  Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
}));

