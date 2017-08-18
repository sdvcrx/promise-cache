const CacheDriver = require('./redisCacheDriver')

const Cache = {}

Cache.remember = function remember (key, timeout = 0, promise) {
  return new Promise((resolve, reject) => {
    CacheDriver.get(key).then((cacheData) => {
      if (cacheData.invalid()) {
        promise.then((data) => {
          // cache data
          CacheDriver.set(key, data)

          resolve(data)
        })
      } else {
        resolve(cacheData.data)
      }
    })
  })
}

Cache.rememberForever = function rememberForever (key, promise) {
  return Cache.remember(key, 0, promise)
}

module.exports = Cache
