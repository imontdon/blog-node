const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const querystring = require('querystring')
const { access } = require('./src/utils/log')
const { formatDate } = require('./src/utils')

// 获取 cookie 过期时间
const getCookieExpires = () => {
  const date = new Date()
  date.setTime(date.getTime() + (1000 * 60 * 60 * 24))
  return date.toGMTString()
}

// session 数据
// const SESSION_DATA = {}

// 处理POST
const getPostData = (req) => {
  return new Promise((reslove, reject) => {
    if (req.method !== 'POST') {
      reslove({})
      return
    }
    if (req.headers['content-type'] !== 'application/json' && req.path !== '/api/user/login') {
      reslove({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        reslove({})
        return
      }
      if (req.path === '/api/user/login') {
        const entries = postData.split('&')
        const obj = {}
        entries.forEach(entry => {
          obj[entry.split('=')[0]] = entry.split('=')[1]
        })
        postData = obj
        console.log('postData', postData, `位置: ${__filename}`)
        reslove(postData)
      } else {
        reslove(JSON.parse(postData))
      }
    })
  })
}


const serverHandle = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , content-type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');//设置方法
  res.setHeader('Content-type', 'application/json')
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} -- ${formatDate(new Date())}`)
  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 获取GET DATA
  req.query = querystring.parse(url.split('?')[1])


  // 解析cookie
  // req.cookie = {}

  // req.session = SESSION_DATA

  // console.log('req.session: ', req.session)
  
  /* const cookieStr = req.headers.cookie || ''  // key = value; key2 = value2

  cookieStr.split(';').forEach(item => {
    if (!item) {
      return 
    }
    const arr = item.split("=")
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  })

  console.log(req.cookie, 'cookie') */


  // 解析session
  /* let needSetCookie = false
  let userId = req.cookie.userid
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    console.log('userId', userId)
    SESSION_DATA[userId] = {}
  }
  console.log('needSetCookie', needSetCookie)
  // console.log(SESSION_DATA[userId], 'SESSION_DATA[userId]')
  req.session = SESSION_DATA[userId] // 对象指针
  console.log('req.session', req.session) */

  // 获取POST DATA
  const postData = await getPostData(req)
  req.body = postData

  console.log('\r\n路由: ', req.path, `位置: ${__filename}`)
  // 处理BLOG路由
  const blogData = await handleBlogRouter(req)
  if (blogData) {
    /* if (needSetCookie) {
      console.log('needSetCookie', needSetCookie)
      res.setHeader('Set-Cookie', `userid = ${userId}; path = /; httpOnly; expires = ${getCookieExpires()} `) // HTTPOnly限制前端修改cookie
    } */
    res.end(JSON.stringify(blogData))
    return
  }
  
  // 处理USER路由
  const userData = await handleUserRouter(req, res)
  if (userData) {
    /* if (needSetCookie) {
      console.log([`userid = ${userId}`, `path = /`, `httpOnly`, `expires = ${getCookieExpires()}`].join(';'))
      res.setHeader('Set-Cookie', [`userid = ${userId}`, `path = /`, `httpOnly`, `expires = ${getCookieExpires()}`]) // HTTPOnly限制前端修改cookie
    } */
    res.end(JSON.stringify(userData))
    return
  }
  

  // 未命中
  res.writeHeader(404, { 'Content-type': 'text/plain' })
  res.write('404 NOT FOUND\n')
  res.end()
}
module.exports = serverHandle
