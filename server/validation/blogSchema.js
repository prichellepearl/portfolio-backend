const Joi = require("joi");

const blogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().optional(),
  status: Joi.string().valid("draft", "published").optional()
});

module.exports = blogSchema;