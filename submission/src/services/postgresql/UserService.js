const {Pool} = require('pg');
const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const AuthError = require('../../exceptions/AuthenticationError');
class UserService {
  constructor() {
    this._pool = new Pool();
  }

  async checkUserAvaibility(username) {
    const query = {
      text: 'select username from users where username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (result.rows.length) {
      throw new InvariantError('Akun dengan username tersebut sudah didaftarkan');
    }
  }
  async addUser({username, password, fullname}) {
    const id = 'user-' + nanoid(5);

    await this.checkUserAvaibility(username);
    const hashedPassword = bcrypt.hashSync(password, 11);

    const query = {
      text: 'insert into users values($1, $2, $3, $4) returning id',
      values: [id, username, hashedPassword, fullname],
    };
    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyUserAuth(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthError('Kredensial yang Anda berikan salah');
    }

    const {id, password: hashedPassword} = result.rows[0];
    const isVerified = await bcrypt.compare(password, hashedPassword);

    if (!isVerified) {
      throw new AuthError('Kredensial yang Anda berikan salah');
    }

    return id;
  }
}

module.exports = UserService;
