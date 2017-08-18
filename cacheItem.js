const CacheDriver = require('./cacheDriver')

class CacheItem {
  constructor(name = '', data = '') {
    this.name = name
    this.data = data

    const noData = (!name && !data)
    this.createdDate = noData ? 0 : new Date().getTime()
  }

  /**
   * Return true if cacheItem is expired
   */
  invalid() {
    const now = new Date().getTime()
    return now > (this.createdDate + CacheDriver.timeout * 1000)
  }

  toString() {
    return CacheItem.toMethod(this)
  }
}

CacheItem.fromMethod = JSON.parse
CacheItem.toMethod = JSON.stringify

CacheItem.from = function from(str) {
  const obj = CacheItem.fromMethod(str) || {}
  const cacheItem = new CacheItem(obj.name, obj.data)
  cacheItem.createdDate = obj.createdDate || 0
  return cacheItem
}

module.exports = CacheItem
