const CacheDriver = require('./cacheDriver')

class CacheItem {
  constructor(name = '', data = '', timeout = 0) {
    this.name = name
    this.data = data
    this.timeout = timeout

    const noData = (!name && !data)
    this.createdDate = noData ? 0 : new Date().getTime()
  }

  /**
   * Return true if cacheItem is expired
   */
  invalid() {
    const now = new Date().getTime()
    if (this.createdDate === 0) {
      return true
    }
    if (this.timeout > 0) {
      return now > (this.createdDate + this.timeout * 1000)
    }
    return false
  }

  toString() {
    return CacheItem.toMethod(this)
  }
}

CacheItem.fromMethod = function (str) {
  if (!str) {
    return str
  }
  const obj = JSON.parse(str)
  if (obj.data.type === 'Buffer') {
    obj.data = Buffer.from(obj.data)
  }
  return obj
}
CacheItem.toMethod = JSON.stringify

CacheItem.from = function from(str) {
  const obj = CacheItem.fromMethod(str) || {}
  const cacheItem = new CacheItem(obj.name, obj.data)
  cacheItem.createdDate = obj.createdDate || 0
  return cacheItem
}

module.exports = CacheItem
