const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFound = require('../../exceptions/NotFound');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyPlaylistOwner(playlistId, userId) {
    const query = {
      text:
      ` 
      select * from collaborations c
      right join playlists p on c.playlist_id  = p.id 
      where p.id = $1 and (c.user_id = $2 or p.owner = $2)
      `,
      values: [playlistId, userId],
    };
    const results = await this._pool.query(query);

    if (!results.rows.length) {
      throw new AuthorizationError('Anda tidak memiliki akses');
    }
  }

  async checkSongAvailability(songId) {
    const query = {
      text: 'select * from songs where id = $1',
      values: [songId],
    };
    const results = await this._pool.query(query);

    if (!results.rows.length) {
      throw new NotFound('Lagu tidak ditemukan');
    }
  }

  async checkSongInPlaylist(songId, playlistId) {
    const query = {
      text: 'select * from song_playlists where song_id = $1 and playlist_id = $2',
      values: [songId, playlistId],
    };
    const results = await this._pool.query(query);

    if (!results.rows.length) {
      throw new NotFound('Lagu tidak ditemukan dalam playlist');
    }
  }

  async addPlaylist(name, owner) {
    const id = 'playlist-' + nanoid(5);

    const query = {
      text: 'insert into playlists values($1, $2, $3) returning id',
      values: [id, name, owner],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getPlaylistFromUser(userId) {
    const query = {
      text:
      `
      select p."id", p."name" , u.username from users u 
      inner join playlists p on p."owner" = u.id 
      where u.id = $1
      union 
      select p2."name",  p2."name" , u3.username from users u2 
      inner join collaborations c on c.user_id  = u2.id 
      inner join playlists p2 on p2.id = c.playlist_id
      inner join users u3 on u3.id = p2."owner"
      where u2.id  = $1
      `,
      values: [userId],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }

  async deletePlaylistFromUser(playlistId, userId) {
    const query = {
      text: 'select * from playlists where id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFound('Playlist tidak ditemukan');
    }

    const playlist = result.rows[0];
    if (playlist.owner != userId) {
      throw new AuthorizationError('Anda bukan pemilik playlist');
    }

    const deleteQuery = {
      text: 'delete from playlists where id = $1',
      values: [playlistId],
    };

    await this._pool.query(deleteQuery);
  }

  async addSongToPlaylist(songId, playlistId) {
    await this.checkSongAvailability(songId);
    const query = {
      text: 'insert into song_playlists values($1, $2)',
      values: [songId, playlistId],
    };
    await this._pool.query(query);
  }

  async deleteSongFromPlaylist(songId, playlistId) {
    await this.checkSongInPlaylist(songId, playlistId);
    const query = {
      text: 'delete from song_playlists where song_id = $1 and playlist_id = $2',
      values: [songId, playlistId],
    };
    await this._pool.query(query);
  }

  async getSongsInPlaylist(playlistId) {
    const query = {
      text: 'select s.id, s.title, s.performer from song_playlists sp inner join songs s on s.id = sp.song_id where sp.playlist_id = $1',
      values: [playlistId],
    };
    const results = await this._pool.query(query);

    return results.rows;
  }
}

module.exports = PlaylistService;
