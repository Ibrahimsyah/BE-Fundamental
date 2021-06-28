const Joi = require('joi');

const exportPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email().required(),
});

module.exports = {exportPlaylistPayloadSchema};
