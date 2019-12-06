const { errorLog } = require('../utils/log')
const { queryData } = require('../db/mysql')

const getImages = async (req) => {
  const sql = `SELECT * FROM  blog_files_test WHERE 1 = 1`
  return queryData(sql)
}

module.exports = {
  getImages
}