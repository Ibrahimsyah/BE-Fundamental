const Joi = require('joi');

const PostCollaborationPayloadSchema = Joi.object({
  playlistId: Joi.string().length(14).required(),
  userId: Joi.string().length(10).required(),
});

module.exports = {PostCollaborationPayloadSchema};
