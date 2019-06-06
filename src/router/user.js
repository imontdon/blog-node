const { loginCheck } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const handleUserRouter = async (req) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    const res = await loginCheck(username, password)
    if (res.ret_code === 0 && res.ret_data.length > 0) {
      return new SuccessModal('登录成功')
    } else {
      return new ErrorModal('登录失败')
    }
  }
}

module.exports = handleUserRouter