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

module.exports = {
  getList
}