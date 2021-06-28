const InvariantError = require('../../exceptions/InvariantError');
const {FileHeaderSchema} = require('./schema');

module.exports = {
  validateImageHeaders: (headers) => {
    const validationResult = FileHeaderSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
