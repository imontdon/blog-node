class Page {
  private total: number
  private pageSize: number
  private pageNum: number
  constructor(pageSize: number, pageNum: number, total: number) {
    this.pageSize = pageSize
    this.pageNum = pageNum
    this.total = total
  }
}