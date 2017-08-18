const redis = require('./lib/redis')
const CacheDriver = require('./cacheDriver')
const CacheItem = require('./cacheItem')

class RedisCacheDriver extends CacheDriver {
  get(key) {
    return redis.getAsync(key)
      .then(data => CacheItem.from(data))
  }

  set(key, data) {
    const item = new CacheItem(key, data)

    return redis.setAsync(key, item.toString(), 'EX', CacheDriver.timeout)
      .then(() => item)
  }
}

module.exports = new RedisCacheDriver()
