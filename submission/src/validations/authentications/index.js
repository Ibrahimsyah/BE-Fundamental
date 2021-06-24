const InvariantError = require('../../exceptions/InvariantError');
const {PostAuthPayloadSchema, PutAuthPayloadSchema, DeleteAuthPayloadSchema} = require('./schema');

module.exports = {
  validatePostPayload: (payload) => {
    const result = PostAuthPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },

  validatePutPayload: (payload) => {
    const result = PutAuthPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },

  validateDeletePayload: (payload) => {
    const result = DeleteAuthPayloadSchema.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};
