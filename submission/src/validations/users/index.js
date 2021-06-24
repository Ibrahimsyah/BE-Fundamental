const InvariantError = require('../../exceptions/InvariantError');
const {addUserPayload} = require('./schema');

module.exports = {
  validateAddUserPayload: (payload) => {
    const result = addUserPayload.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};
