// 获取环境变量
const env = process.env.NODE_ENV

const PROD_HOST = '101.132.116.241'
const DEV_HOST = '127.0.0.1'

// 配置
let MYSQL_CONFIG = {

}
let REDIS_CONFIG = {}

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: PROD_HOST,
    user: 'root',
    password: 'dws666',
    port: 3306,
    database: 'blog_node'
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: PROD_HOST,
    password: 'dws666',
    opt: {}
  }
}

if (env === 'production') {
  MYSQL_CONFIG = {
    host: PROD_HOST,
    user: 'root',
    pwd: 'dws666',
    port: 3306,
    database: 'blog_node'
  }

  // redis
  REDIS_CONFIG = {
    port: 6379,
    host: PROD_HOST,
    pwd: 'dws666',
    opt: {}
  }
} else {
  
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
}