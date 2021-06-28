const InvariantError = require('../../exceptions/InvariantError');
const {exportPlaylistPayloadSchema} = require('./schema');

module.exports = {
  validateExportPlaylistPayload: (payload) => {
    const result = exportPlaylistPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};
