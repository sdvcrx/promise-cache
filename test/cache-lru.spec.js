const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect = chai.expect

const Cache = require('../')('lru')

const data = { data: 'test' }

// Simulate network request
function request(sec = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, sec)
  })
}


describe('Cache', () => {
  describe('#remember', () => {
    // TODO test actual cache result
    it('expect remember promise result', () => {
      const cacheRequest = Cache.remember('key', request)
      expect(cacheRequest(10)).to.eventually.deep.equal(data)
    })
  })
})
