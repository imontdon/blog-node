const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const querystring = require('querystring')
const serverHandle = (req, res) => {
  /* const method = req.method
  console.log(method)
  const url = req.url
  const path = url.split('?')[0] */
  // const query = querystring.parse(url.split('?')[1])

  res.setHeader('Content-type', 'application/json')

  // 获取path
  const url = req.url
  req.path = url.split('?')[0]

  req.query = querystring.parse(url.split('?')[1])
  // 处理BLOG路由
  const blogData = handleBlogRouter(req, res)
  
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
  /* const resData = {
    method,
    url,
    path,
    query,
    env: process.env.NODE_ENV
  }
  res.end(JSON.stringify(resData)) */
  /* if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }
  if (method === 'POST') {
      let postData = ''
      req.on('data', chunk => {
        postData += chunk
      })
      req.on('end', () => {
        resData.postData = postData
        res.end(JSON.stringify(resData))
      })
  } */
}
module.exports = serverHandle
