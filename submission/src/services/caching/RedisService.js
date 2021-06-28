const redis = require('redis');

class RedisService {
  constructor() {
    this._redis = redis.createClient();
    this.checkConnection();
  }

  checkConnection() {
    this._redis.on('connect', () => {
      console.log(' - Redis Caching Service READY');
    });
    this._redis.on('error', (err) => {
      console.log(' - Redis error', err);
    });
  }
}

module.exports = RedisService;
