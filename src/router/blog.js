const {
  getList, 
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const { redisHmset, redisSet, redisGet } = require('../db/redis')

// 登录验证
const loginCheck = async (req) => {
  // console.log('session: ', req.session, await redisGet(req.session.username))
  if (!await redisGet(req.body.username)) {
    return Promise.resolve(
      new ErrorModal('尚未登录')
    )
  } else {
    console.log(`${req.body.username}用户已登录`)
  }
}

const handleBlogRouter = async (req) => {
  const method = req.method
  const id = req.query.id || ''
  // 获取博客
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const result = await getList(author, keyword).catch(e => e)
    if(result.ret_code === 0) {
      return new SuccessModal(result)
    } else {
      return new ErrorModal(result)
    }
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const result = await getDetail(id).catch(e => e)
    return new SuccessModal(result)
  }
  // 新建博客接口
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body
    console.log(blogData, `位置: ${__filename}`)
    const loginCheckResult = await loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = await newBlog(blogData).catch(e => e)
    if (result.ret_code === 0 && result.ret_data.affectedRows === 1) {
      return new SuccessModal(result)
    } else {
      return new ErrorModal(result)
    }
  }
  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const loginCheckResult = await loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = updateBlog(id, req.body).catch(e => e)
    if (result.ret_code === 0) {
      return new SuccessModal('成功')
    } else {
      return new ErrorModal(result)
    }
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const loginCheckResult = await loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = await deleteBlog(id).catch(e => e)
    if (result.ret_code === 0) {
      return new SuccessModal(result)
    } else {
      return new ErrorModal(result)
    }
  }

}

module.exports = handleBlogRouter