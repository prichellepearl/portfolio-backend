const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .required()
    .messages({
      "string.base": "Name must be a text value",
      "string.min": "Name must be at least 2 characters long",
      "any.required": "Name is required"
    }),

  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required"
    }),

  message: Joi.string()
    .min(10)
    .required()
    .messages({
      "string.min": "Message must be at least 10 characters long",
      "any.required": "Message is required"
    })
});

module.exports = contactSchema;
