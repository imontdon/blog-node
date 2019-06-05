const { 
  execSql,
  insertData
} = require('../db/mysql')
// 获取博客列表
const getList = (author, keyword) => {

  let sql = 'select * from blogs where 1=1 '
  if (author) {
    sql += ` and author= ${author}`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ' order by createtime desc'
  return execSql(sql)
}

// 获取博客详情
const getDetail = (id) => {
  let sql = 'select * from blogs where 1=1 '
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
  return insertData('blogs', {
    title: blogData.title,
    content: blogData.content,
    author: blogData.author,
    createtime: new Date().valueOf()
  })
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