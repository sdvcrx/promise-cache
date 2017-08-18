class CacheDriver {
  get(key) {
    throw new Error("Please implement CacheDriver.get method")
  }

  set(key, data) {
    throw new Error("Please implement CacheDriver.set method")
  }
}

CacheDriver.timeout = 1 * 60 * 60   // 1 hour by default

module.exports = CacheDriver
