const Joi = require('joi');

const CreatePlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const AddSongToPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().length(10).required(),
});

const DeleteSongToPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().length(10).required(),
});

module.exports = {CreatePlaylistPayloadSchema, AddSongToPlaylistPayloadSchema, DeleteSongToPlaylistPayloadSchema};
