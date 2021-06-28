const {generateError, responseSuccessNoData} = require('../../utils/ResponseHandler');

class ExportHandler {
  constructor(exportService, playlistService, validator) {
    this._exportService = exportService;
    this._playlistService = playlistService;
    this._validator = validator;

    this.exportPlaylist = this.exportPlaylist.bind(this);
  }

  async exportPlaylist(request, h) {
    try {
      this._validator.validateExportPlaylistPayload(request.payload);
      const {targetEmail} = request.payload;
      const {playlistId} = request.params;
      const {id} = request.auth.credentials;

      const message = {
        userId: id,
        targetEmail: targetEmail,
      };
      await this._playlistService.verifyPlaylistOwner(playlistId, id);
      await this._exportService.sendMessage('export:playlist', message);

      const response = responseSuccessNoData(h, 'Playlist akan segera masuk email anda', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = ExportHandler;
