const LRU = require('lru-cache')
const CacheDriver = require('./cacheDriver')
const CacheItem = require('./cacheItem')

class LRUCacheDriver extends CacheDriver {
  constructor () {
    super()
    this.cache = LRU({
      max: 500,
      maxAge: CacheDriver.timeout
    })
  }

  get (key) {
    return Promise.resolve(CacheItem.from(this.cache.get(key)))
  }

  set (key, data, timeout = CacheDriver.timeout) {
    const item = new CacheItem(key, data, timeout)

    return Promise.resolve(this.cache.set(key, item, timeout))
  }
}

module.exports = new LRUCacheDriver()
