const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../../exceptions/InvariantError');

class CollaborationService {
  constructor() {
    this._pool = new Pool();
  }

  async checkCollaboratorAlreadyInPlaylist(userId, playlistId) {
    const query = {
      text: 'select * from collaborations where user_id = $1 and playlist_id = $2',
      values: [userId, playlistId],
    };
    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Pengguna sudah menjadi kolaborator');
    }
  }
  async addCollaboratorToPlaylist(userId, playlistId) {
    await this.checkCollaboratorAlreadyInPlaylist(userId, playlistId);

    const id = `collab-${nanoid(5)}`;

    const query = {
      text: 'insert into collaborations values($1, $2, $3) returning id',
      values: [id, playlistId, userId],
    };
    const collaborationId = await this._pool.query(query);

    return collaborationId;
  }

  async removeCollaboratorFromPlaylist(userId, playlistId) {
    const query = {
      text: 'delete from collaborations where playlist_id = $1 and user_id = $2',
      values: [playlistId, userId],
    };
    await this._pool.query(query);
  }
}

module.exports = CollaborationService;
