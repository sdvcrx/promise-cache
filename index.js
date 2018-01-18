function serializeArguments (obj) {
  return Array
    .from(obj)
    .map(val => JSON.stringify(val))
    .join('-')
}

function factory (type = 'lru', options = {}) {
  const CacheDriver = require(`./lib/${type}CacheDriver`)
  const cacheDriver = new CacheDriver(options)

  const Cache = {
    options,
    cacheDriver
  }

  Cache.remember = function rememberFunc (key, func, timeout) {
    return function () {
      return new Promise((resolve, reject) => {
        const cacheKey = `${key}-${serializeArguments(arguments)}`

        cacheDriver.get(cacheKey).then((cacheData) => {
          if (cacheData.invalid()) {
            func.apply(this, arguments).then((data) => {
              // cache data
              cacheDriver.set(cacheKey, data, timeout)

              resolve(data)
            }).catch(err => reject(err))
          } else {
            resolve(cacheData.data)
          }
        })
      })
    }
  }

  return Cache
}

module.exports = factory
