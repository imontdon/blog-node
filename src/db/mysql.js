const mysql = require('mysql')
const { humpToHyphen } = require('../utils')
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接对象
// const conn = mysql.createConnection(MYSQL_CONFIG)

const pool = mysql.createPool(MYSQL_CONFIG)

// conn.connect()

// 统一执行sql
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
        console.log(errInfo)
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
const execSql = (sql, values) => {
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
 * 
 * @param {[string]} tableName 
 * @param {[Array]} values 
 * @description sql = 'INSERT INTO SET XX=XX, XX=XX'
 */
const insertData = (tableName, values) => {
  return new Promise((reslove, reject) => {
    if (!tableName || !values) {
      reject(handleResults('参数错误', null))
    } else {
      let sql = `INSERT INTO ?? `
      sql = valuesSet(sql, values)
      execQuery(sql, tableName, (error, results) => {
        reslove(handleResults(error, results))
      })
    }
  })
}
/**
 * @param {[string]]} sql [sql]
 * @param {[Object]} values 
 */
const valuesSet = (sql, values) => {
  let res = []
  Object.keys(values).forEach(key => {
    const k = humpToHyphen(key)
    let value = values[key]
    res.push(`${k} = '${value}'`)
  })
  const SETSQL = 'SET ' + res.join(', ').trim()
  console.log(sql + SETSQL)
  return sql + SETSQL
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
  execSql,
  insertData
}