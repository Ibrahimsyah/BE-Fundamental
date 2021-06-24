const {Pool} = require('pg');
const InvariantError = require('../../exceptions/InvariantError');

class AuthService {
  constructor() {
    this._pool = new Pool();
  }

  async addRefreshToken(refreshToken) {
    const query = {
      text: 'insert into authentications values($1)',
      values: [refreshToken],
    };

    await this._pool.query(query);
  }

  async verifyRefreshToken(refreshToken) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [refreshToken],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async deleteRefreshToken(refreshToken) {
    await this.verifyRefreshToken(refreshToken);
    const query = {
      text: 'delete from authentications where token = $1',
      values: [refreshToken],
    };

    await this._pool.query(query);
  }
}

module.exports = AuthService;
