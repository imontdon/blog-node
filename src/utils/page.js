class Page {
  constructor(currentPage, pageSize = 10, pageList) {
    this.currentPage = pageList.length > 0 ? currentPage : 0
    this.pageSize = pageList.length > 0 ? pageSize : 0
    this.length = 0 // 总数
    this.hasNextPages = false // 是否有下一页
    this.hasPreviousPages = false // 是否有上一页
    this.pageStartRow = 0 // 页面开始行
    this.pageEndRow = 0 // 页面结束行
    this.total = 0 // 分页页数
    this.pageList = pageList
    this.resList = []
    this.setData()
  }
  setData() {
    this.length = this.pageList.length
    if (this.length > 0) {
      if (this.length % this.pageSize === 0) {
        this.total = Math.floor(this.length / this.pageSize)
      } else {
        this.total = Math.floor(this.length / this.pageSize) + 1
      }
      if (this.currentPage + 1 > this.total) {
        this.hasNextPages = false
      } else {
        this.hasNextPages = true
      }
      if (this.currentPage - 1 > 0) {
        this.hasPreviousPages = true
      } else {
        this.hasPreviousPages = false
      }
      if (this.hasPreviousPages) {
        this.pageStartRow = (this.currentPage - 1) * this.pageSize + 1
      } else {
        this.pageStartRow = 1
      }
      if (this.hasNextPages) {
        this.pageEndRow = this.currentPage * this.pageSize
      } else {
        this.pageEndRow = this.length
      }
      this.resList = this.pageList.slice(this.pageStartRow - 1, this.pageEndRow)
    }
  }
}

module.exports = Page