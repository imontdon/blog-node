// 获取环境变量
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONFIG = {}

if (env === 'dev') {
  MYSQL_CONFIG = {
    host: '101.132.116.241',
    user: 'root',
    password: 'dws666',
    port: 3306,
    database: 'blog_node'
  }
}

if (env === 'production') {
  MYSQL_CONFIG = {
    host: '101.132.116.241',
    user: 'root',
    password: 'dws666',
    port: 3306,
    database: 'blog_node'
  }
}

module.exports = {
  MYSQL_CONFIG
}