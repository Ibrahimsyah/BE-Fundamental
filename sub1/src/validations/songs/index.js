const InvariantError = require('../../exceptions/InvariantError');
const SongPayloadSchema = require('./schema');

module.exports = {
  validateSongPayload: (payload) => {
    const result = SongPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};
