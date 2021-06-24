const Joi = require('joi');

const addUserPayload = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6).max(16),
  fullname: Joi.string().required(),
});

module.exports = {addUserPayload};
