const http = require('http')
console.log('start')
let helloworld = ''

for (let i = 0; i < 1999 * 20; i++) {
  helloworld += `a${i},`
}
helloworld = new Buffer(helloworld)
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end(helloworld)
  console.log('end')
})

server.listen(1998)