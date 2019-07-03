const net = require('net')

const server = net.createServer(socket => {
  
  socket.on('data', chunk => {
    socket.write('hello world', chunk)
  })

  socket.write('net as tcp connection')
})

server.listen(512)