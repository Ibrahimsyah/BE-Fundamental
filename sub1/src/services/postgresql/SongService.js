const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFound = require('../../exceptions/NotFound');
const {mapSongEntityToModel, mapSongListEntityToModel} = require('../../utils/Mapper');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({title, year, performer, genre, duration}) {
    const id = 'song-' + nanoid(5);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'insert into songs values($1, $2, $3, $4, $5, $6, $7, $8) returning id',
      values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllSongs() {
    const query = 'select * from songs';
    const result = await this._pool.query(query);
    if (!result) {
      throw new InvariantError('Lagu tidak ditemukan');
    }
    return result.rows.map(mapSongListEntityToModel);
  }

  async getSongById(songId) {
    const query = {
      text: 'select * from songs where id = $1',
      values: [songId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFound(`Lagu dengan id ${songId} tidak ditemukan`);
    }
    return mapSongEntityToModel(result.rows[0]);
  }

  async editSongById(songId, {title, year, performer, genre, duration}) {
    const query = {
      text: 'update songs set title = $1, year = $2, performer = $3, genre = $4, duration = $5 where id = $6',
      values: [title, year, performer, genre, duration, songId],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFound(`Lagu dengan id ${songId} tidak ditemukan`);
    }
  }

  async deleteSongById(songId) {
    const query = {
      text: 'delete from songs where id = $1',
      values: [songId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFound(`Gagal menghapus lagu, lagu dengan id ${songId} tidak ditemukan`);
    }
  }
}

module.exports = SongService;
