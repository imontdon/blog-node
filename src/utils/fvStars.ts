interface Star {
  x: number,
  score: number
}
export default class fvStars {
  public ctx: CanvasRenderingContext2D
  public score: number
  public radius: number
  public positionX: number
  public stars: Array<Star>
  /**
   * @author imontdon
   * @type
   * @param { CanvasRenderingContext2D } ctx 
   * @param { number } score 分数
   * @param { number } radius 五角星为圆心，到五角星外顶点的距离
   * @param { number } positionX 间距，x偏移量
   */
  constructor(ctx: CanvasRenderingContext2D, score: number, radius: number, positionX: number) {
    this.ctx = ctx
    this.radius = radius
    this.positionX = positionX
    this.stars = this.getStars(score)
  }
  initStars() {
    const ctx: CanvasRenderingContext2D = this.ctx
    let rotate: number = 72, R: number = this.radius, r: number = R / 2, y: number = 30
    for (let k = 1; k < 6; k++) {
      let x: number = this.positionX * k
      ctx.beginPath()
      ctx.fillStyle = "#ddd";
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + 72 * i + rotate) / 180 * Math.PI) * R + x, - Math.sin((18 + 72 * i + rotate) / 180 * Math.PI) * R + y);
        ctx.lineTo(Math.cos((54 + 72 * i + rotate) / 180 * Math.PI) * r + x, - Math.sin((54 + 72 * i + rotate) / 180 * Math.PI) * r + y);
      }
      ctx.fill()
      ctx.closePath()
    }
  }
  draw() {
    // const canvas: HTMLCanvasElement  = document.createElement('canvas')
    this.initStars()
    const ctx: CanvasRenderingContext2D = this.ctx
    ctx.save()
    ctx.fillStyle = 'yellow'
    this.stars.forEach((star, index, arr) => {
      let rotate: number = 72, R: number = this.radius, r: number = R / 2, x: number = this.positionX * star.x, y: number = 30
      ctx.beginPath()
      ctx.fillStyle = "rgb(255, 204, 51)";
      // ctx.moveTo(180, 30)
      for (let i = 0; i < (star.score * 5 === 1 ? 2 : star.score * 5); i++) {
        ctx.lineTo(Math.cos((18 + 72 * i + rotate) / 180 * Math.PI) * R + x, - Math.sin((18 + 72 * i + rotate) / 180 * Math.PI) * R + y);
        ctx.lineTo(Math.cos((54 + 72 * i + rotate) / 180 * Math.PI) * r + x, - Math.sin((54 + 72 * i + rotate) / 180 * Math.PI) * r + y);
      }
      ctx.fill()
      // ctx.lineTo(Math.cos(18 / 180 * Math.PI) * R, -Math.sin(18 / 180 * Math.PI) * R)
      ctx.closePath()
    })
    ctx.restore()
  }
  getStars(score: number) {
    score = score > 5 ? 5 : score
    let stars: Array<Star> = []
    let cellAmount: number = Math.ceil(score)
    /* while (cellAmount--) {
      stars.push({
        x: 5 - cellAmount,
        score: cellAmount >= 1 ? 1 : min
      })
    } */
    for (let i: number = 1; i <= cellAmount; i++) {
      stars.push({
        x: i,
        score: i > score ? parseFloat((score + 1 - i).toFixed(2)) : 1
      })
    }
    return stars
  }
}