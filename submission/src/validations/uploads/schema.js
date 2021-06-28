const Joi = require('joi');

const FileHeaderSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
  'content-length': Joi.number().max(5000),
}).unknown();

module.exports = {FileHeaderSchema};
