const redis = require('redis')

// 创建客户端

//101.132.116.241
const redisClient = redis.createClient(6379, '127.0.0.1')

redisClient.on_error = (err) => {
  console.log(err)
}

// 测试

redisClient.set('myname', 'dws')

redisClient.get('myname', (err, val) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(val, 'val')

  // 退出
  redisClient.quit()
})