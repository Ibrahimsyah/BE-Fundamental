const {generateError, responseSuccessWithData} = require('../../utils/ResponseHandler');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.addSong = this.addSong.bind(this);
  }

  async addSong(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {title, year, performer, genre, duration} = request.payload;

      const song = {title, year, performer, genre, duration};
      const songId = await this._service.addSong(song);

      const response = responseSuccessWithData(h, 'Lagu berhasil ditambahkan', {songId});
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = SongHandler;
