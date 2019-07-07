const redis = require('redis')
const async = require('async')
// 创建客户端

//
const redisClient = redis.createClient( 6379, '101.132.116.241')

redisClient.on("error", function (err) {
  console.log("Error " + err);
});


redisClient.on('connect', () => {
  console.log('connect');
})
redisClient.on('ready', () => {
  console.log('ready');
})
redisClient.auth('dws666', () => {
  console.log('redis连接成功')
})
// 测试

// redisClient.set('name', 'dws')

const redisHmset = (key, value) => {
  console.log(key, value)
  redisClient.hmset(key, value, (error) => {
    if (error) {
      console.log('redis hash设置出错: ',error)
      return
    }
    console.log('redis hash设置成功', key)
  })
}

// redisHmset('userdws', { user_name: 'dws', real_name: 'dws' })

/* redisClient.keys('*', (err, replies) => {
  console.log(replies)
  for (let i = 0; i < replies.length; i++) {
    // redisClient.del(replies[i], ..args)
    if (replies[i].indexOf('_') > -1) {
      redisClient.hgetall(replies[i], (err, result) => {
        redisClient.hdel(replies[i], ...Object.keys(result))
      })
    } else {
      redisClient.get(replies[i], (err, result) => {
        const res = redisClient.del(replies[i], result)
        console.log(res)
      })
    }
  }
}) */

async.series([
  (cb) => {
    redisClient.keys('*', (err, replies) => {
      console.log('keys: ', replies)
      let i = 0
      for (let reply of replies) {
        // redisClient.del(replies[i], ..args)
        if (reply.indexOf('_') > -1) {
          redisClient.hgetall(reply, (err, result) => {
            const res = redisClient.hdel(reply, ...Object.keys(result))
            res ? i++ : null
            console.log(i)
            if (i === replies.length) {
              cb(null, null)
            }
          })
        } else {
          redisClient.get(reply, (err, result) => {
            const res = redisClient.del(reply, result)
            res ? i++ : null
            if (i === replies.length) {
              cb(null, null)
            }
          })
        }
      }
      if (replies.length === 0) {
        cb(null, null)
      }
    })
  }
], (err, result) => {
  redisClient.quit()
  console.log('quit')
})

// redisClient.hm

/* redisClient.get('name', (err, val) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(val, 'val')
  // 退出
  redisClient.quit()
}) */