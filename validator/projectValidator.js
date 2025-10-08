const Joi = require('joi');

const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
  createdBy: Joi.string().required()
});

function validateProjectInput(data) {
  return projectSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateProjectInput
};