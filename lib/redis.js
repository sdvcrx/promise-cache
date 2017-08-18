const redis = require('redis')
const promisify = require('./promisify')
const config = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB
}

promisify.promisifyAll(redis.RedisClient.prototype)

module.exports = redis.createClient(config)
