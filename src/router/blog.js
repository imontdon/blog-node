const {
  getList, 
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModal, ErrorModal } = require('../modal/resModal')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const id = req.query.id || ''
  // 获取博客
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    const listData = getList(author, keyword)
    return new SuccessModal(listData)
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
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
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModal('成功')
    } else {
      return new ErrorModal('失败')
    }
  }
  
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    const result = deleteBlog(id)
    if (result) {
      return new SuccessModal('删除成功')
    } else {
      return new ErrorModal('删除失败')
    }
  }

}

module.exports = handleBlogRouter