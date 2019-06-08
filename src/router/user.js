const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../modal/resModal')

// 获取 cookie 过期时间
const getCookieExpires = () => {
  const date = new Date()
  date.setTime(date.getTime() + (1000 * 60 * 60 * 24))
  return date.toGMTString()
}

const handleUserRouter = async (req, res) => {
  const method = req.method

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query
    const result = await userLogin(username, password)
    if (result.ret_code === 0 && result.ret_data.length > 0) {
      res.setHeader('Set-Cookie', `username = ${username}; path = /; httpOnly; expires = ${getCookieExpires()} `) // HTTPOnly限制前端修改cookie
      return new SuccessModal(result.ret_data[0], '登录成功')
    } else {
      return new ErrorModal(result)
    }
  }

  // 测试登录验证
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.cookie.username) {
      return new SuccessModal()
    } else {
      return new ErrorModal('尚未登录')
    }
  }
}

module.exports = handleUserRouter