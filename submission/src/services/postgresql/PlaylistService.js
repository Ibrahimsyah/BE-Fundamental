const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFound = require('../../exceptions/NotFound');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyPlaylistOwner(playlistId, owner) {
    const query = {
      text: 'select * from playlists where id = $1',
      values: [playlistId],
    };
    const results = await this._pool.query(query);
    if (!results.rowCount) {
      throw new NotFound('Playlist tidak ditemukan');
    }

    const playlist = results.rows[0];
    if (playlist.owner != owner) {
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

  async getPlaylistFromOwner(owner) {
    const query = {
      text: 'select p.id, name, username from playlists p inner join users u on p.owner = u.id where p.owner = $1',
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylistFromOwner(playlistId, owner) {
    const query = {
      text: 'select * from playlists where id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFound('Playlist tidak ditemukan');
    }
    const playlist = result.rows[0];
    if (playlist.owner != owner) {
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
