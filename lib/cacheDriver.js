class CacheDriver {
  constructor(options = {}) {
    this.timeout = options.timeout || 1 * 60 * 60   // 1 hour by default
    this.options = options
  }

  get(key) {
    throw new Error("Please implement CacheDriver.get method")
  }

  set(key, data) {
    throw new Error("Please implement CacheDriver.set method")
  }
}

module.exports = CacheDriver
