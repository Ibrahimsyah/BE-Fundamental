const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const {mapSongEntityToModel} = require('../../utils/Mapper');

class SongService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({title, year, performer, genre, duration}) {
    const id = 'song-' + nanoid(5);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'insert into songs values($1, $2, $3, $4, $5, $6, $7, $8) returning id',
      values: [id, title, year, performer, genre, duration, createdAt, updatedAt],
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
    return result.rows.map(mapSongEntityToModel);
  }
}

module.exports = SongService;
