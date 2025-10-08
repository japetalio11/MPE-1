const Joi = require('joi');

const taskSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().allow(''),
  createdBy: Joi.string().required()
});

function validateTaskInput(data) {
  return taskSchema.validate(data, { abortEarly: false });
}

module.exports = {
  validateTaskInput
};