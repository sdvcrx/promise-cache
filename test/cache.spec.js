const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect = chai.expect

const Cache = require('../')

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
      const cacheRequest = Cache.rememberForever('key', request())
      expect(cacheRequest).to.eventually.deep.equal(data)
    })
  })
})
