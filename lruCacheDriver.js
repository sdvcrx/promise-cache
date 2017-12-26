const LRU = require('lru-cache')
const CacheDriver = require('./cacheDriver')
const CacheItem = require('./cacheItem')

class LRUCacheDriver extends CacheDriver {
  constructor(options) {
    super(options)

    this.cache = LRU(Object.assign({}, {
      maxAge: this.timeout
    }, this.options))
  }

  get (key) {
    return Promise.resolve(CacheItem.from(this.cache.get(key)))
  }

  set (key, data, timeout = this.timeout) {
    const item = new CacheItem(key, data, timeout)

    return Promise.resolve(this.cache.set(key, item, timeout))
  }
}

module.exports = LRUCacheDriver
