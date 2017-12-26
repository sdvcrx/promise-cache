const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect = chai.expect

const Cache = require('../')('redis')
const request = require('./request')

describe('Cache', () => {
  const cacheRequest = Cache.remember('key', request)

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
