const CacheDriver = require('./cacheDriver')
const CacheItem = require('./cacheItem')

class SimpleCacheDriver extends CacheDriver {
  constructor (options) {
    super(options)
    this._cache = {}
  }

  get (key) {
    return new Promise((resolve) => {
      const item = this._cache[key]
      if (item && !item.invalid()) {
        resolve(item)
        return item
      }
      const _item = new CacheItem()
      resolve(_item)
    })
  }

  set (key, data) {
    return new Promise((resolve) => {
      const item = new CacheItem(key, data)
      this._cache[key] = item
      resolve(item)
      return item
    })
  }
}

module.exports = SimpleCacheDriver
