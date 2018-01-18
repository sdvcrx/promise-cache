const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const { expect } = chai

const Cache = require('../')('lru')
const request = require('./request')

describe('Cache(lru)', () => {
  const cacheRequest = Cache.remember('key', request)

  describe('#remember', () => {
    beforeEach(() => {
      return cacheRequest(100)
    })

    it('expect remember promise result', function () {
      // set timeout to make sure hit cache
      this.timeout(10)

      const promise = cacheRequest(100)
      expect(promise).eventually.deep.equal(request.data)

      return promise
    })
  })
})
