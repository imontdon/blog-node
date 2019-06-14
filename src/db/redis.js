const redis = require('redis')

const { REDIS_CONFIG } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host, REDIS_CONFIG.opt)

redisClient.on_error = (err) => {
  console.log(err)
}
redisClient.auth(REDIS_CONFIG.pwd, () => {
  console.log('redis===')
})
const set = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
}

const get = (key) => {
  return new Promise((reslove, reject) => {
    redisClient.get('myname', (err, val) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      console.log(val, 'val')
      if (val === null) {
        reslove(null)
      }

      try {
        reslove(
          JSON.parse(val)
        )
      } catch (e) {
        reslove(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}