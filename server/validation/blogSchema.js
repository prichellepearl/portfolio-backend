const blogSchema = Joi.object({
  title: Joi.string().min(3).required(),
  body: Joi.string().min(10).required()
});

module.exports = blogSchema;
