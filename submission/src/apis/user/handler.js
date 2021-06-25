const {generateError, responseSuccessWithData} = require('../../utils/ResponseHandler');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.addUser = this.addUser.bind(this);
  }

  async addUser(request, h) {
    try {
      this._validator.validateAddUserPayload(request.payload);
      const {username, fullname, password} = request.payload;

      const user = {username, password, fullname};
      const userId = await this._service.addUser(user);

      const response = responseSuccessWithData(h, {userId}, 'User berhasil ditambahkan', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = SongHandler;
