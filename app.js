const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const querystring = require('querystring')

// 处理POST
const getPostData = (req) => {
  return new Promise((reslove, reject) => {
    if (req.method !== 'POST') {
      reslove({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
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
      reslove(JSON.parse(postData))
    })
  })
}
const serverHandle = async (req, res) => {
  res.setHeader('Content-type', 'application/json')


  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  // 获取GET DATA
  req.query = querystring.parse(url.split('?')[1])

  // 获取POST DATA
  const postData = await getPostData(req)
  req.body = postData

  console.log('路由: ', req.path)
  // 处理BLOG路由
  const blogData = await handleBlogRouter(req, res)
  
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }
  
  // 处理USER路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData ))
    return
  }
  

  // 未命中
  res.writeHeader(404, { 'Content-type': 'text/plain' })
  res.write('404 NOT FOUND\n')
  res.end()
}
module.exports = serverHandle
