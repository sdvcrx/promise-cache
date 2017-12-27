const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect = chai.expect

const CacheFactory = require('../')
const Cache = CacheFactory('redis')
const request = require('./request')

describe('Cache', () => {
  const cacheRequest = Cache.remember('key', request)

  describe('#init', () => {
    it('expect initial cacheDriver with options', () => {
      const _cache = CacheFactory('redis', {
        timeout: 123
      })
      expect(_cache.cacheDriver.options.timeout).to.equal(123)
    })
  })

  describe('#remember', () => {
    beforeEach(() => {
      return cacheRequest(100)
    })

    it('expect remember promise result', function () {
      this.timeout(10)

      const promise = cacheRequest(100)

      expect(promise).to.eventually.deep.equal(request.data)

      return promise
    })
  })
})
