const InvariantError = require('../../exceptions/InvariantError');
const {PostCollaborationPayloadSchema} = require('./schema');

module.exports = {
  validatePostCollaborationPayload: (payload) => {
    const result = PostCollaborationPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};
