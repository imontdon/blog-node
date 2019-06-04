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

const newBlog = (blogData = {}) => {
  console.log('newBlog blogData: ', blogData)
  return {
    id: 3
  }
}
module.exports = {
  getList,
  getDetail,
  newBlog
}