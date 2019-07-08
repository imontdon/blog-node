const { userLogin } = require('../controller/user')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const { redisHmset, redisSet, redisGet, redisDel, setRedisExpire } = require('../db/redis')

// 登录验证
const loginCheck = async (req) => {
  if (!await redisGet(req.body.username)) {
    return Promise.resolve(
      new ErrorModal('尚未登录')
    )
  } else {
    console.log(`${req.body.username}用户已登录`)
  }
}

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
    const result = await userLogin(username, password)
    if (result.ret_code === 0 && result.ret_data.length > 0) { // 有数据
      const userid = `${Date.now()}_${Math.random()}`

      // 判断是否有登录信息
      if (await redisGet(`user${username}`)) {
        const key = await redisGet(`user${username}`)
        const arr = Object.keys(result.ret_data[0])
        redisDel(key, arr) // 有删除
      }
      redisSet(`user${username}`, userid) // 建立新的登录信息
      const newUserid = await redisGet(`user${username}`)
      console.log(newUserid, typeof newUserid)
      if (newUserid) { // 是否创建成功
        setRedisExpire(`user${username}`, 60 * 60 * 24) 
        setTimeout(() => {
          setRedisExpire(newUserid, 60 * 60 * 24) 
        }, 1000);
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

  if (method === 'POST' && req.path ==='/api/user/checkLogin') {
    // 登录验证
    if (!await redisGet(`user${req.body.user}`)) {
      return Promise.resolve(
        new ErrorModal('尚未登录')
      )
    } else {
      return Promise.resolve(
        new SuccessModal('已登录')
      )
      // console.log(`${req.session.username}用户已登录`)
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