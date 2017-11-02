const redis = require('./lib/redis')
const CacheDriver = require('./cacheDriver')
const CacheItem = require('./cacheItem')

class RedisCacheDriver extends CacheDriver {
  get(key) {
    return redis.getAsync(key)
      .then(data => CacheItem.from(data))
  }

  set(key, data, timeout = CacheDriver.timeout) {
    const item = new CacheItem(key, data, timeout)

    if (timeout === 0) {
      return redis.setAsync(key, item.toString(), 'EX', timeout)
        .then(() => item)
    } else {
      return redis.setAsync(key, item.toString())
        .then(() => item)
    }
  }
}

module.exports = new RedisCacheDriver()
