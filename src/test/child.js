

const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'application/json' })
  res.end('handle by child, pid: ', process.pid + '\n')
})

process.on('message', (m, tcp) => {
  console.log(`子进程${process.pid}收到消息`, m);
  if (m === 'server') {
    tcp.on('connection', socket => {
      server.emit('connection', socket)
    })
  }
});
