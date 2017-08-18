const expect = require('chai').expect

const CacheItem = require('../cacheItem')

describe('CacheItem', () => {
  describe('#invalid', () => {
    it('expect return false if cache is not expired', () => {
      const item = new CacheItem('test', 'data')
      expect(item.invalid()).to.be.false
    })

    it('expect return true if cache is empty', () => {
      const item = new CacheItem()
      expect(item.invalid()).to.be.true
    })
  })

  describe('#serialize', () => {
    it('expect serialize to json string', () => {
      const item = new CacheItem('test', 'data')
      const jsonStr = item.toString()
      expect(jsonStr).to.include('{"name":"test","data":"data"')
    })
  })

  describe('#deserialize', () => {
    it('expect deserialize from json string to cache item', () => {
      const json = `{"name":"test","data":"data","createdDate":${new Date().getTime()}}`
      const item = CacheItem.from(json)
      expect(item.invalid()).to.be.false
      expect(item).to.have.all.keys('name', 'data', 'createdDate')
    })
  })
})
