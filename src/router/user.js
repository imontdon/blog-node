const { loginCheck } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const handleUserRouter = (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const flag = loginCheck(username, password)
    if (flag) {
      return new SuccessModal('登录成功')
    } else {
      return new ErrorModal('登录失败')
    }
  }
}

module.exports = handleUserRouter