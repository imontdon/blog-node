const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../modal/resModal')


const handleUserRouter = async (req, res) => {
  const method = req.method

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body
    // const { username, password } = req.query
    const result = await userLogin(username, password)
    if (result.ret_code === 0 && result.ret_data.length > 0) {
      req.session.username = result.ret_data[0].user_name
      req.session.realname = result.ret_data[0].real_name

      console.log(req.session, req.session)
      return new SuccessModal(result.ret_data[0], '登录成功')
    } else {
      return new ErrorModal(result)
    }
  }

  // 测试登录验证
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return new SuccessModal({
        session: req.session
      })
    } else {
      return new ErrorModal('尚未登录')
    }
  }
}

module.exports = handleUserRouter