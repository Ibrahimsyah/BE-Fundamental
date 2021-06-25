const InvariantError = require('../../exceptions/InvariantError');
const {CreatePlaylistPayloadSchema, AddSongToPlaylistPayloadSchema, DeleteSongToPlaylistPayloadSchema} = require('./schema');

module.exports = {
  validateCreatePlaylistPayload: (payload) => {
    const result = CreatePlaylistPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },

  validateAddSongToPlaylistPayload: (payload) => {
    const result = AddSongToPlaylistPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },

  validateDeleteSongFromPlaylistPayload: (payload) => {
    const result = DeleteSongToPlaylistPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};
