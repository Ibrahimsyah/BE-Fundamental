const {generateError, responseSuccessWithData} = require('../../utils/ResponseHandler');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.addSong = this.addSong.bind(this);
    this.getAllSongs = this.getAllSongs.bind(this);
  }

  async addSong(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {title, year, performer, genre, duration} = request.payload;

      const song = {title, year, performer, genre, duration};
      const songId = await this._service.addSong(song);

      const response = responseSuccessWithData(h, {songId}, 'Lagu berhasil ditambahkan', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async getAllSongs(_, h) {
    try {
      const songs = await this._service.getAllSongs();
      const response = responseSuccessWithData(h, {songs});
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = SongHandler;
