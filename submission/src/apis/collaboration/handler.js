const {generateError, responseSuccessWithData, responseSuccessNoData} = require('../../utils/ResponseHandler');

class CollaborationHandler {
  constructor(playlistService, collaborationService, validator) {
    this._playlistService = playlistService;
    this._collaborationService = collaborationService;
    this._validator = validator;

    this.addCollaborator = this.addCollaborator.bind(this);
  }

  async addCollaborator(request, h) {
    try {
      this._validator.validatePostCollaborationPayload(request.payload);
      const {playlistId, userId} = request.payload;
      const {id: owner} = request.auth.credentials;
      await this._playlistService.verifyPlaylistOwner(playlistId, owner);

      const collaborationId = await this._collaborationService.addCollaboratorToPlaylist(userId, playlistId);
      const response = responseSuccessWithData(h, {collaborationId}, 'Kolaborasi berhasil ditambahkan', 201);
      return response;
    } catch (err) {
      return generateError(err, h);
    }
  }
}

module.exports = CollaborationHandler;
