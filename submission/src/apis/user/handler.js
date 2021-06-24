const {generateError, responseSuccessWithData, responseSuccessNoData} = require('../../utils/ResponseHandler');

class SongHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.addUser = this.addUser.bind(this);
    this.getAllSongs = this.getAllSongs.bind(this);
    this.getSongById = this.getSongById.bind(this);
    this.editSongById = this.editSongById.bind(this);
    this.deleteSongById = this.deleteSongById.bind(this);
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

  async getAllSongs(_, h) {
    try {
      const songs = await this._service.getAllSongs();
      const response = responseSuccessWithData(h, {songs});
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async getSongById(request, h) {
    try {
      const {id} = request.params;
      const song = await this._service.getSongById(id);
      const response = responseSuccessWithData(h, {song});
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async editSongById(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);
      const {id} = request.params;
      await this._service.editSongById(id, request.payload);
      const response = responseSuccessNoData(h, 'lagu berhasil diperbarui');
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async deleteSongById(request, h) {
    try {
      const {id} = request.params;
      await this._service.deleteSongById(id);
      const response = responseSuccessNoData(h, 'Lagu berhasil di hapus');
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = SongHandler;
