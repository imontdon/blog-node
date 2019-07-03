const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const { redisHmset, redisSet, redisGet } = require('../db/redis')

const handleUserRouter = async (req, res) => {
  const method = req.method

  // 非简单请求验证通过
  if (method === 'OPTIONS') {
    return new SuccessModal('')
  }
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    console.log('req.body', req.body, `位置: ${__filename}`)
    const { username, password } = req.body
    if (username === undefined || password === undefined) {
      return new ErrorModal(`参数错误参数: ${req.body}`)
    }
    // const { username, password } = req.query
    const result = await userLogin(username, password)
    if (result.ret_code === 0 && result.ret_data.length > 0) {
      // req.session.username = result.ret_data[0].user_name
      // req.session.realname = result.ret_data[0].real_name
      const userid = `${Date.now()}_${Math.random()}`
      redisSet(`user${username}`, userid)
      if (redisGet(`user${username}`)) {
        redisHmset(userid, result.ret_data[0])
      } else {
        return new ErrorModal('失败')
      }
      // console.log('登录后的session', req.session)
      return new SuccessModal(result.ret_data[0], '登录成功')
    } else {
      return new ErrorModal(result)
    }
  }

  // 测试登录验证
  /* if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return new SuccessModal({
        session: req.session
      })
    } else {
      return new ErrorModal('尚未登录')
    }
  } */
  if (method === 'POST' && req.path === '/api/usr/xss') {
    return
  }
}

module.exports = handleUserRouter