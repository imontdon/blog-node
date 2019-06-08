const { queryData } = require('../db/mysql')
// 登录
const loginCheck = (username, password) => {
  /* if (username === 'zhangsan' && password === '123') {
    return true
  } else {
    return false
  } */
  const sql = 'SELECT user_name, real_name from blog_user where user_name = ? and password = ?'
  return queryData(sql, [username, password])
}

module.exports = {
  loginCheck
}