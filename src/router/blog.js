const {
  getList, 
  getDetail,
  newBlog
} = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const handleBlogRouter = (req, res) => {
  const method = req.method
  // 获取博客
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModal(listData)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const id = req.query.id || ''
    const detailData = getDetail(id)
    return new SuccessModal(detailData)
  }
  // 新建博客接口
  if (method === 'POST' && req.path === '/api/blog/new') {
    const blogData = req.body
    const data = newBlog(blogData)
    return new SuccessModal(data)
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '这是更新博客接口'
    }
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '这是删除博客接口'
    }
  }

}

module.exports = handleBlogRouter