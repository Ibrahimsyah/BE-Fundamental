const redis = require('redis');

class RedisService {
  constructor() {
    this._redis = redis.createClient({
      host: process.env.REDIS_SERVER,
    });
    this._checkConnection();
  }

  _checkConnection() {
    this._redis.on('connect', () => {
      console.log('[Redis] Caching Service READY');
    });
    this._redis.on('error', (err) => {
      console.log('[Redis] Redis error', err);
    });
  }

  set(key, value, expirationInSecond = 3600) {
    return new Promise((resolve, reject) => {
      this._redis.set(key, value, 'EX', expirationInSecond, (err, ok) => {
        if (err) {
          console.log('[Redis] insert error:', err.message);
          return reject(err);
        }
        return resolve(ok);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this._redis.get(key, (err, value) => {
        if (err) {
          console.log('[Redis] get error:', err);
          return reject(err);
        }
        if (!value) {
          return reject(new Error('Cache not found'));
        }
        return resolve(JSON.parse(value));
      });
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this._redis.del(key, (err, ok) => {
        if (err) {
          console.log('[Redis] delete error:', err);
          return reject(err);
        }
        return resolve(ok);
      });
    });
  }
}

module.exports = RedisService;
