const chai = require('chai')
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect = chai.expect

const RedisCacheDriver = require('../lib/redisCacheDriver')
const redisCacheDriver = new RedisCacheDriver()

const data = { data: 'test' }

function Timeout (secs) {
  return new Promise((resolve) => {
    setTimeout(resolve, secs * 1000)
  })
}

function testRedisGet (keyName, data, done) {
  const promise = redisCacheDriver.get(keyName, data)
    .then(d => d.data)

  const chain = expect(promise)
    .to.eventually.deep.equal(data)

  if (done) {
    chain.notify(done)
  }
}

describe('RedisCacheDriver', () => {
  describe('#options', function () {
    it('expect initial cacheDriver with specify options', () => {
      const driver = new RedisCacheDriver({
        timeout: 1800
      })

      expect(driver.options.timeout).to.equal(1800)
    })
  })

  describe('#get', function () {
    this.timeout(2000)

    it('expect get key from redis', (done) => {
      redisCacheDriver.set('key1', data).then(() => {
        testRedisGet('key1', data, done)
      }).catch(done)
    })

    it('expect get key from redis with timeout', (done) => {
      redisCacheDriver.set('key2', data, 1).then(() => {

        testRedisGet('key2', data)

        return Timeout(1)
      }).then(() => {
        testRedisGet('key2', undefined, done)
      }).catch(done)
    })
  })
})
