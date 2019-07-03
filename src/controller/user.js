const { queryData } = require('../db/mysql')
// 登录
const userLogin = (username, password) => {
  const sql = `SELECT user_name, real_name from blog_user where user_name = ? and password = ?`
  return queryData(sql, [username, password]).catch(e => e)
}

module.exports = {
  userLogin
}