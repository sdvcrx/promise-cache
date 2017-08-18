// polyfill for node 8 `util.promisify`, fallback to `bluebird.promisify`

const util = require('util')

function isFunction (func) {
  return typeof func === 'function'
}

function getPromisifyFunc () {
  if (isFunction(util.promisify)) {
    return util.promisify
  }
  return require('bluebird').promisify
}

const promisify = getPromisifyFunc()

function getPromisifyAllFunc () {
  return require('bluebird').promisifyAll
}

module.exports = {
  promisify,
  promisifyAll: getPromisifyAllFunc()
}
