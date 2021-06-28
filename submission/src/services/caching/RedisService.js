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

  insert(key, value) {
    return new Promise((resolve, reject) => {
      this._redis.set(key, JSON.stringify(value), (err, ok) => {
        if (err) {
          console.log('[Redis] insert error:', err.message);
          reject(err);
        }
        resolve(ok);
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this._redis.get(key, (err, value) => {
        if (err) {
          console.log('[Redis] get error:', err);
          reject(err);
        }
        resolve(JSON.parse(value));
      });
    });
  }

  delete(key) {
    return new Promise((resolve, reject) => {
      this._redis.del(key, (err, ok) => {
        if (err) {
          console.log('[Redis] delete error:', err);
          reject(err);
        }
        resolve(ok);
      });
    });
  }
}

module.exports = RedisService;
