const redis = require('redis')
const {
  formatDate
} = require('../utils')
const { REDIS_CONFIG } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host, REDIS_CONFIG.opt)

redisClient.on("error", function (err) {
  console.log("Error " + err);
});

redisClient.auth(REDIS_CONFIG.password, () => {
  console.log('redis连接成功')
})
const redisSet = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value, redis.print)
}

const redisGet = (key) => {
  return new Promise((reslove, reject) => {
    if (!key) {
      reslove(null)
      return
    }
    redisClient.get(key, (err, val) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      if (val === null) {
        reslove(null)
        return
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

const redisHmset = (key, value) => {
  redisClient.hmset(key, value, (error) => {
    if (error) {
      console.log('redis hash设置出错: ',error)
      return
    }
    console.log('redis hash设置成功', key)
  })
}

/**
 * 
 * @param {string} key 
 * @param {Array} args 
 * @return {boolean}
 */
const redisDel = (key, args) => {
  const result = redisClient.del(key, ...args)
  if (result) {
    console.log(`redis删除key: ${key}成功`)
  } else {
    console.log(`redis删除失败`)
  }
  return result
}

/**
 * @description 过期时间
 * @param {string} key 
 * @param {number} milliseconds 毫秒
 */
const setRedisPexpire = (key, milliseconds) => {
  const date = new Date()
  const res = redisClient.pexpire(key, new Date(date.valueOf() + milliseconds))
  if (res) {
    const pexpireTime = new Date(date.valueOf() + milliseconds)
    console.log(`redis, key: ${key} 过期时间为: ${formatDate(pexpireTime)}`)
  }
  return res
}
/**
 * @description 过期时间
 * @param {string} key 
 * @param {number} seconds 秒
 */
const setRedisExpire = (key, seconds) => {
  const date = new Date()
  const res = redisClient.expire(key, seconds)
  if (res) {
    const expireTime = new Date(date.valueOf() + seconds * 1000)
    console.log(`redis, key: ${key} 过期时间为: ${formatDate(expireTime)}`)
  }
}

const redisHgetall = (key) => {
  redisClient.hgetall(key, (err, result) => {
    if (err) {
      console.log(err)
      return false
    }
    console.log(result)
    return true
  })
}
module.exports = {
  redisSet,
  redisGet,
  redisDel,
  setRedisPexpire,
  setRedisExpire,
  redisHmset,
  redisHgetall
}