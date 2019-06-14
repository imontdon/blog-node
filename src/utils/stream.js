// 标准输入输出
// process.stdin.pipe(process.stdout)

const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './log.txt')
const fileName2 = path.resolve(__dirname, './log-back.txt')

/* const readStream = fs.createReadStream(fileName)
const writeStream = fs.createWriteStream(fileName2)

readStream.pipe(writeStream)


readStream.on('data', chunk => {
  console.log(chunk.toString())
})
readStream.on('end', () => {
  console.log('copy down ')
}) */

const http = require('http')
const server = http.createServer((req, res) => {
  req.setEncoding('utf8');
  if (req.method === 'GET') {
    const readStream = fs.createReadStream(fileName2)
    readStream.setEncoding('utf-8')
    debugger
    readStream.on('data', chunk => {
      console.log(chunk.toString())
    })
    readStream.pipe(res)
  }
})

server.listen(3000)