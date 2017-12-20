# promise-cache-memorize #

[![Build Status](https://travis-ci.org/sdvcrx/promise-cache.svg?branch=master)](https://travis-ci.org/sdvcrx/promise-cache)
[![npm package](https://img.shields.io/npm/v/promise-cache-memorize.svg)](https://www.npmjs.com/package/promise-cache-memorize)

Memoize promise-returning functions.

## Usage ##

```javascript
const Cache = require('promise-cache-memorize')('redis')

const requestWithCache = Cache.remember('request', request)
```

### cacheFactory(type, options) -> Cache ###

Factory function that configuring and returning actual `Cache` object.

* **type** - cache backend. Current support `simple` , `lru` or `redis`

* **options** - cache backend configuration.

  * **timeout** - (default: 3600) cache expire timeout, 1 hour by default


  * if it is [redis](https://github.com/luin/ioredis) backend, see [ioredis document](https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options)
  * if it is [lru](https://github.com/isaacs/node-lru-cache) backend, see [lru document](https://github.com/isaacs/node-lru-cache#options)

#### Cache.remember(key, fn, maxAge) -> memorizedFn ####

Memorize promise-returning functions `fn` with `key`.

* **fn** - function that returning promise.
* **key** - string using as cache key.
* **maxAge** - (default: options.timeout) cache expired after `maxAge` seconds.

## Example ##

```javascript
const request = require('request-promise')
const Cache = require('promise-cache-memorize')('redis')

const requestWithCache = Cache.remember('request', request)

function sendRequest () {
  return requestWithCache('http://httpbin.org/get')
}

sendRequest().then((res) => {
  console.log(res)

  // hit cache
  sendRequest().then((res) => {
    console.log(res)
  })
})
```

## TODO ##

- [x] Provide options for cache type
- [x] Multiple cache backend support

## License ##

MIT
