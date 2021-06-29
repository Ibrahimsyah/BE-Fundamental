const {generateError, responseSuccessWithData, responseSuccessNoData} = require('../../utils/ResponseHandler');

class PlaylistHandler {
  constructor(service, validator, cachingService) {
    this._service = service;
    this._validator = validator;
    this._cachingService = cachingService;

    this.addPlaylist = this.addPlaylist.bind(this);
    this.getUserPlaylist = this.getUserPlaylist.bind(this);
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
    this.deleteSongFromPlaylist = this.deleteSongFromPlaylist.bind(this);
    this.getSongsInPlaylist = this.getSongsInPlaylist.bind(this);
  }

  async addPlaylist(request, h) {
    try {
      this._validator.validateCreatePlaylistPayload(request.payload);
      const {id: owner} = request.auth.credentials;
      const {name} = request.payload;

      const playlistId = await this._service.addPlaylist(name, owner);

      const response = responseSuccessWithData(h, {playlistId}, 'Playlist berhasil ditambahkan', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async getUserPlaylist(request, h) {
    try {
      const {id: userId} = request.auth.credentials;

      const playlists = await this._service.getPlaylistFromUser(userId);

      const response = responseSuccessWithData(h, {playlists});
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async deletePlaylist(request, h) {
    try {
      const {playlistId} = request.params;
      const {id: userId} = request.auth.credentials;

      await this._service.deletePlaylistFromUser(playlistId, userId);

      const response = responseSuccessNoData(h, 'Playlist berhasil dihapus');
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async addSongToPlaylist(request, h) {
    try {
      this._validator.validateAddSongToPlaylistPayload(request.payload);
      const {playlistId} = request.params;
      const {songId} = request.payload;
      const {id: owner} = request.auth.credentials;

      await this._service.verifyPlaylistOwner(playlistId, owner);
      await this._service.addSongToPlaylist(songId, playlistId);
      await this._cachingService.delete(`playlist:${playlistId}`);

      const response = responseSuccessNoData(h, 'Lagu berhasil ditambahkan ke playlist', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async deleteSongFromPlaylist(request, h) {
    try {
      this._validator.validateDeleteSongFromPlaylistPayload(request.payload);
      const {playlistId} = request.params;
      const {songId} = request.payload;
      const {id: owner} = request.auth.credentials;

      await this._service.verifyPlaylistOwner(playlistId, owner);
      await this._service.deleteSongFromPlaylist(songId, playlistId);
      await this._cachingService.delete(`playlist:${playlistId}`);

      const response = responseSuccessNoData(h, 'Lagu berhasil dihapus ke playlist');
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }

  async getSongsInPlaylist(request, h) {
    try {
      const {playlistId} = request.params;
      const {id: owner} = request.auth.credentials;

      await this._service.verifyPlaylistOwner(playlistId, owner);

      let songs;
      try {
        songs = await this._cachingService.get(`playlist:${playlistId}`);
      } catch {
        songs = await this._service.getSongsInPlaylist(playlistId);
        await this._cachingService.set(`playlist:${playlistId}`, JSON.stringify(songs));
      }

      const response = responseSuccessWithData(h, {songs});
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = PlaylistHandler;
