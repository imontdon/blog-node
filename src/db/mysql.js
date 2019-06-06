const mysql = require('mysql')
const { humpToHyphen } = require('../utils')
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接对象
// const conn = mysql.createConnection(MYSQL_CONFIG)

const pool = mysql.createPool(MYSQL_CONFIG)

// conn.connect()

/** 
 * [公共SQL]
 * @param  {string} sql [Required]
 * @return {promise}             
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
 * @param  {String} sql [Required]
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
 * @param {string} tableName 
 * @param {[string]} values 
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
          reject(handleResults('新建失败', null))
        } else {
          reslove(handleResults('新建成功', results))
        }
      })
    }
  })
}


/**
 * [更新数据]
 * @param {string} tableName 
 * @param {[string]} values 
 * @param {[string]} whereArr 
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
 * @param {string} sql 
 * @param {[string]} values 
 * @callback callback 
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
 * @callback callback
 */
const execUpdate = (sql, values, callback) => {
  execQuery(sql, values, (err, results) => {
    callback(err, results)
  })
}



/**
 * [设置SET]
 * @param {string} sql [sql]
 * @param {Object} values 
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
 * @param {string} sql 
 * @param {[string]} where 
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
 * [设置LIMIT]
 * @param {string} sql 
 * @param {Object} pageInfo 
 * @param {number} pageInfo.pageSize - 页大小 [require]
 * @param {number} pageInfo.pageNum - 第几页 [require]
 */
const appendLimit = (sql, pageInfo) => {
  let pageBegin = 0, pageNum = 1, pageSize = 1
  if (pageInfo.hasOwnProperty('pageNum')) {
    Object.keys(pageInfo).forEach(key => {
      if (key === 'pageSize') {
        pageSize = pageInfo[key]
      }
      if (key === 'pageNum') {
        pageNum = pageInfo[key]
      }
    })
    pageBegin = (pageNum - 1) * pageSize
    return `${sql} LIMIT ${pageBegin}, ${pageSize} `
  } else {
    return ` ${sql} LIMIT ${pageInfo.pageSize}`
  }
  
}

/**
 * [设置子查询LIMIT]
 * @param {string} sql 
 * @param {Object} pageInfo 
 * @param {number} pageInfo.pageSize - 页大小 [require]
 * @param {number} pageInfo.pageNum - 第几页 [require]
 */
const appendSubLimit = (sql, pageInfo) => {
  let pageBegin = 0, pageNum = 1, pageSize = 1
  Object.keys(pageInfo).forEach(key => {
    if (key === 'pageSize') {
      pageSize = pageInfo[key]
    }
    if (key === 'pageNum') {
      pageNum = pageInfo[key]
    }
  })
  pageBegin = (pageNum - 1) * pageSize
  return `${sql} LIMIT ${pageBegin}, 1 `
}



/**
 * [子查询SQL]
 * @param {string} tableName 
 * @param {Object} pageInfo [require]
 * @param {number} pageInfo.pageSize - 页大小 [require]
 * @param {number} pageInfo.pageNum - 第几页 [require]
 * @param {[string]} where 
 * @return {string} sql
 * @description id递增可用
 */
const getSubQuery = (tableName, pageInfo, where = []) => {
  let subQuery = ` SELECT id FROM ${tableName} `
  subQuery = appendWhere(subQuery, where)
  subQuery = appendSubLimit(subQuery, pageInfo)
  return subQuery
}


/**
 * [分页-子查询优化]
 * @param {string} tableName 
 * @param {Object} pageInfo [require]
 * @param {number} pageInfo.pageSize - 页大小 [require]
 * @param {number} pageInfo.pageNum - 第几页 [require]
 * @param {[string]} where 
 * @returns {promise}
 * @description id递增可用
 */
const pagingQuery = (tableName, pageInfo, where = []) => {
  return new Promise(reslove => {
    const subQuery = getSubQuery(tableName, pageInfo, where)
    let sql = 'SELECT * FROM ?? '
    where.push(` id >= (${subQuery})`)
    sql = appendWhere(sql, where)
    sql = appendLimit(sql, { pageSize: pageInfo.pageSize })
    // reslove(subQuery)
    execQuery(sql, tableName, (err, results) => {
      reslove(handleResults(err, results))
    })
  })
}

/**
 * [处理返回结果集]
 * @param  {string} info  [description]
 * @param  {Object} result [description]
 * @return {Object}        [description]
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
  deleteData,
  pagingQuery
}