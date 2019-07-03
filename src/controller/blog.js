const { 
  queryData,
  insertData,
  updateData,
  deleteData,
  pagingQuery
} = require('../db/mysql')
const { formatDate } = require('../utils')
// 获取博客列表
const getList = async (author, keyword) => {

  let sql = 'select * from blogs where 1=1 '
  if (author) {
    sql += ` and author = ${author}`
  }
  if (keyword) {
    sql += ` and title like '%${keyword}%'`
  }
  sql += ' order by createtime desc'
  /* const res = await pagingQuery('blogs', { pageSize: 3, pageNum: 2 }, [`author = ${author}`]).catch(e => e)
  console.log(res) */
  return await queryData(sql).catch(e => e)
}

// 获取博客详情
const getDetail = async (id) => {
  let sql = 'select * from blogs where 1=1 '
  if (id) {
    sql += ` and id = ${id} `
  }
  return await queryData(sql).catch(e => e)
}

// 新建一篇博客
const newBlog = async (blogData = {}) => {
  console.log('newBlog blogData: ', blogData, `位置: ${__filename}`)
  return await insertData('blogs', {
    title: blogData.title,
    content: blogData.content,
    author: blogData.author,
    createtime: formatDate(new Date())
  }).catch(e => e)
}

// 更新博客
const updateBlog = async (id, blogData = {}) => {
  console.log('updateBlog: ' ,id, blogData, `位置: ${__filename}`)
  return await updateData('blogs', blogData, [`id = ${id}`]).catch(e => e)
}

// 删除博客
const deleteBlog = async (id) => {
  console.log('deleteBlog:', id, `位置: ${__filename}`)
  return await deleteData('blogs', [`id = ${id}`]).catch(e => e)
  
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}