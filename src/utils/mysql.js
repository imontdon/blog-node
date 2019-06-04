const mysql = require('mysql')

const conn = mysql.createConnection({
  host: '101.132.116.241',
  user: 'root',
  password: 'dws666',
  port: 3306,
  database: 'blog_node'
})

// 开始连接
conn.connect()

const sql = 'select * from blog_user'
conn.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result)
})

// 关闭连接
conn.end()