const {generateError, responseSuccessWithData} = require('../../utils/ResponseHandler');

class UploadHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.uploadImage = this.uploadImage.bind(this);
  }

  async uploadImage(request, h) {
    try {
      const {data} = request.payload;
      this._validator.validateImageHeaders(data.hapi.headers);

      const location = await this._service.writeFile(data, data.hapi);

      const pictureUrl = `http://${process.env.HOST}:${process.env.PORT}/upload/images/${location}`;
      const response = responseSuccessWithData(h, {pictureUrl}, 'Gambar berhasil diunggah', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = UploadHandler;
