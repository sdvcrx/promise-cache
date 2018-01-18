const Redis = require('ioredis')
const CacheDriver = require('./cacheDriver')
const CacheItem = require('./cacheItem')

class RedisCacheDriver extends CacheDriver {
  constructor (options) {
    super(options)

    this.redis = new Redis(options)
  }

  get (key) {
    return this.redis.get(key)
      .then(data => CacheItem.from(data))
  }

  set (key, data, timeout = this.timeout) {
    const item = new CacheItem(key, data, timeout)

    if (timeout !== 0) {
      return this.redis.set(key, item.toString(), 'EX', timeout)
        .then(() => item)
    } else {
      return this.redis.set(key, item.toString())
        .then(() => item)
    }
  }
}

module.exports = RedisCacheDriver
