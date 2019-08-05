const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-type': 'application/json' })
  res.end('handle by worker, pid is: ', process.pid)
})

var worker

process.on('message', (m, tcp) => {
  if (m === 'server') {
    worker = tcp
    worker.on('connection', (socket) => {
      worker.emit('connection', socket)
      socket.end('handle by worker pid :', process.pid)
    })
  }
})

process.on('uncaughtException', (err) => {
  process.send({ act: 'suicide' })
  worker.close(() => {
    process.exit(1)
  })
})