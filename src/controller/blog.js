// 获取博客列表
const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'i am guozhizhang',
      author: 'guozhizhang',
      content: 'guozhizhangAAAA',
      createTime: new Date()
    },
    {
      id: 2,
      title: 'i am guozhizhangBBB',
      author: 'guozhizhangBBB',
      content: 'guozhizhangBBBB',
      createTime: new Date()
    },
  ]
}

// 获取博客详情
const getDetail = (id) => {
  return [
    {
      id: 1,
      author: 'zhangsan',
      title: 'testA',
      content: 'content11111',
      createTime: new Date()
    }
  ]
}

// 新建一篇博客
const newBlog = (blogData = {}) => {
  console.log('newBlog blogData: ', blogData)
  return {
    id: 3
  }
}

// 更新博客
const updateBlog = (id, blogData = {}) => {
  console.log('updateBlog: ' ,id, blogData)
  return true
}

// 删除博客
const deleteBlog = (id) => {
  console.log('deleteBlog:', id)
  return true
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}