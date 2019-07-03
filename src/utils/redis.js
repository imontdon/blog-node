const redis = require('redis')

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

redisClient.set('name', 'dws')

redisClient.get('name', (err, val) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(val, 'val')



  // 退出
  redisClient.quit()
})