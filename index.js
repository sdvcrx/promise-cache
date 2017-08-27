const CacheDriver = require('./redisCacheDriver')

const Cache = {}

function serializeArguments(obj) {
  return Array
    .from(obj)
    .map(val => JSON.stringify(val))
    .join('-')
}

Cache.rememberFunc = function rememberFunc (key, func) {
  return function () {
    return new Promise((resolve, reject) => {
      const cacheKey = `${key}-${serializeArguments(arguments)}`

      CacheDriver.get(cacheKey).then((cacheData) => {
        if (cacheData.invalid()) {
          func.apply(this, arguments).then((data) => {
            // cache data
            CacheDriver.set(cacheKey, data)

            resolve(data)
          }).catch(err => reject(err))
        } else {
          resolve(cacheData.data)
        }
      })
    })
  }
};

/**
 * Cache promise result
 *
 * @param {String} key
 * @param {Number} timeout seconds
 * @param {Function} funcReturnPromise function that return a promise
 */
Cache.remember = function remember (key, timeout = 0, funcReturnPromise) {
  return new Promise((resolve, reject) => {
    CacheDriver.get(key).then((cacheData) => {
      if (cacheData.invalid()) {
        lazyPromise().then((data) => {
          // cache data
          CacheDriver.set(key, data)

          resolve(data)
        }).catch(err => reject(err))
      } else {
        resolve(cacheData.data)
      }
    })
  })
}

/**
 * Cache promise result permanently
 *
 * @param {String} key
 * @param {Function} funcReturnPromise function that return a promise
 */
Cache.rememberForever = function rememberForever (key, funcReturnPromise) {
  return Cache.remember(key, 0, funcReturnPromise)
}

module.exports = Cache
