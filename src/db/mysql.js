const mysql = require('mysql')
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接对象
// const conn = mysql.createConnection(MYSQL_CONFIG)

const pool = mysql.createPool(MYSQL_CONFIG)

// conn.connect()

// 统一执行sql
const exec = (sql) => {
  return new Promise((reslove, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      reslove(result)
    })
  })
}

const execQuery = (sql, values, callback) => {
  let errInfo = ''
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('database err: ', err)
      throw error;
    }
    connection.query(sql, values, (err, rows) => {
      connection.release()
      if (err) {
        errInfo = `DB-SQL语句执行错误: ${err}`
        callback(err)
      } else {
        callback(err, rows)
      }
    })
  })
}

/** 
 * [执行SQL语句]
 * @param  {[String]} sql [Required]
 * @return {[promise]}             
 */
const execSQL = (sql, values) => {
  return new Promise((resolve, reject) => {
    if (sql) {
      execQuery(sql, values, (err, results) => {
        resolve(handleResults(err, results));
      })
    } else {
      reject(handleResults('参数错误', null));
    }
  })
}

/**
 * [处理返回结果集]
 * @param  {[Array]} error  [description]
 * @param  {[Array]} result [description]
 * @return {[type]}        [description]
 */
const handleResults = (error, data) => {
  if (data) {
    return { ret_data: data, success: true, error: null, ret_code: 0 }
  } else {
    return { success: false, error, ret_code: 1 };
  }
}
module.exports = {
  execSQL
}