const { 
  queryData,
  insertData,
  updateData,
  deleteData
} = require('../db/mysql')
const { formatDate } = require('../utils')
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
  return queryData(sql)
}

// 获取博客详情
const getDetail = async (id) => {
  let sql = 'select * from blogs where 1=1 '
  if (id) {
    sql += ` and id = ${id} `
  }
  return await queryData(sql)
}

// 新建一篇博客
const newBlog = async (blogData = {}) => {
  console.log('newBlog blogData: ', blogData)
  return await insertData('blogs', {
    title: blogData.title,
    content: blogData.content,
    author: blogData.author,
    createtime: formatDate(new Date())
  })
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
  console.log('updateBlog: ' ,id, blogData)
  const res = await updateData('blogs', blogData, [`id = ${id}`])
  return res
}

// 删除博客
const deleteBlog = async (id) => {
  console.log('deleteBlog:', id)
  const res = await deleteData('blogs', [`id = ${id}`])
  return res
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}