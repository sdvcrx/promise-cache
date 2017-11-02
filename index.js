const CacheDriver = require('./redisCacheDriver')

const Cache = {}

function serializeArguments(obj) {
  return Array
    .from(obj)
    .map(val => JSON.stringify(val))
    .join('-')
}

Cache.remember = function rememberFunc (key, func, timeout) {
  return function () {
    return new Promise((resolve, reject) => {
      const cacheKey = `${key}-${serializeArguments(arguments)}`

      CacheDriver.get(cacheKey).then((cacheData) => {
        if (cacheData.invalid()) {
          func.apply(this, arguments).then((data) => {
            // cache data
            CacheDriver.set(cacheKey, data, timeout)

            resolve(data)
          }).catch(err => reject(err))
        } else {
          resolve(cacheData.data)
        }
      })
    })
  }
};

module.exports = Cache
