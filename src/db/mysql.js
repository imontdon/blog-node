const mysql = require('mysql')
const { humpToHyphen } = require('../utils')
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接对象
// const conn = mysql.createConnection(MYSQL_CONFIG)

const pool = mysql.createPool(MYSQL_CONFIG)

// conn.connect()

/** 
 * [公共SQL]
 * @param  {[String]} sql [Required]
 * @return {[promise]}             
 */
const execQuery = (sql, values, callback) => {
  let errInfo = ''
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('database err: ', err)
      throw error;
    }
    connection.query(sql, values, (err, rows) => {
      connection.release()
      if (err) {
        errInfo = `DB-SQL语句执行错误: ${err}`
        console.log(errInfo)
        callback(err)
      } else {
        console.log(sql)
        callback(err, rows)
      }
    })
  })
}

/** 
 * [查询数据]
 * @param  {[String]} sql [Required]
 * @return {[promise]}             
 */
const queryData = (sql, values) => {
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
 * [插入数据]
 * @param {[string]} tableName 
 * @param {[Object]} values 
 * @description sql = 'INSERT INTO SET XX=XX, XX=XX'
 */
const insertData = (tableName, values) => {
  return new Promise((reslove, reject) => {
    if (!tableName || !values) {
      reject(handleResults('参数错误', null))
    } else {
      let sql = `INSERT INTO ?? `
      sql = valuesSet(sql, values)
      /* execQuery(sql, tableName, (err, results) => {
        reslove(handleResults(err, results))
      }) */
      execUpdate(sql, tableName, (err, results) => {
        if (err) {
          reject(handleResults(err, null))
        } else {
          reslove(handleResults(err, results))
        }
      })
    }
  })
}


/**
 * [更新数据]
 * @param {[string]} tableName 
 * @param {[Object]} values 
 * @param {[Array]} whereArr 
 * @description sql = 'UPDATE TABLENAME SET XX=XX, XX=XX WHERE'
 */
const updateData = (tableName, values, whereArr) => {
  return new Promise((reslove, reject) => {
    if (!tableName || !whereArr) {
      reject(handleResults('参数错误', null))
    } else {
      let sql = 'UPDATE ?? '
      sql = valuesSet(sql, values)
      sql = appendWhere(sql, whereArr)
      execUpdate(sql, tableName, (err, results) => {
        if (err) {
          reject(handleResults(err, null))
        } else {
          // reslove(handleResults(err, results))
          if (results.affectedRows === 0) {
            reslove(handleResults('更新失败', null))
          } else {
            reslove(handleResults('更新成功', null))
          }
        }
      })
      /* execQuery(sql, tableName, (err, results) => {
        if (err) {
          reject(handleResults(err, null))
        } else {
          reslove(handleResults(err, results))
        }
      }) */
    }
  })
}

/**
 * [删除数据]
 * @param {*} sql 
 * @param {*} values 
 * @param {*} callback 
 */
const deleteData = (tableName, whereArr) => {
  return new Promise((reslove, reject) => {
    if (!tableName || !whereArr) {
      reject(handleResults('参数错误', null))
    } else {
      let sql = 'DELETE FROM ?? '
      sql = appendWhere(sql, whereArr)
      execUpdate(sql, tableName, (err, results) => {
        if (err) {
          reject(handleResults(err, null))
        } else {
          if (results.affectedRows === 0) {
            reslove(handleResults('删除失败 => 找不到该id', null))
          } else {
            reslove(handleResults('删除成功', null))
          }
        }
      })
    }
  })
}

/**
 * [公共更新]
 * @param {*} sql 
 * @param {[string]} values 
 * @param {[fuction]} callback
 */
const execUpdate = (sql, values, callback) => {
  execQuery(sql, values, (err, results) => {
    callback(err, results)
  })
}



/**
 * [设置SET]
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
  return sql + SETSQL
}

/**
 * [设置WHERE]
 * @param {*} error 
 * @param {*} data 
 */
const appendWhere = (sql, where = []) => {
  if (Object.is([], where)) {
    return sql
  } else {
    whereSQL = where.join(' AND ').trim()
    return `${sql} WHERE ${whereSQL}`
  }
}



/**
 * [处理返回结果集]
 * @param  {[Array]} error  [description]
 * @param  {[Array]} result [description]
 * @return {[type]}        [description]
 */
const handleResults = (info, data) => {
  if (data) {
    return { ret_data: data, ret_code: 0, ret_info: info }
  } else {
    return { ret_data: data, ret_code: 1, ret_info: info };
  }
}


module.exports = {
  queryData,
  insertData,
  updateData,
  deleteData
}