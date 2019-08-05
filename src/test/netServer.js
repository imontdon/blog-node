const net = require('net')
const clients = []
/* const server = net.createServer(socket => {
  clients.push(socket)
  console.log(`服务器地址: ${socket.remoteAddress}, 当前在线${clients.length}位`)
  socket.on('end', () => {
    console.log('客户端断开连接')
  })
  socket.on('data', chunk => {
    console.log(chunk.toString())
  })
  socket.write('你好\r\n');
  socket.pipe(socket);
}) */
const subprocess = require('child_process').fork(`${__dirname}/child.js`);
const server = net.createServer()

server.on('connection', (socket) => {
  // socket.end('goodbye\n');
  clients.push(socket)
  console.log(`地址: ${socket.remoteAddress}, 当前在线${clients.length}位`)
  socket.on('end', () => {
    console.log(clients[0]._peername, socket.address())
    console.log('客户端断开连接', socket)
  })
  socket.on('data', chunk => {
    console.log(chunk.toString())
  })
  socket.write('你好\r\n');
  socket.pipe(socket);
})

server.listen(8080, () => {
  console.log('服务器启动')
  subprocess.send('server', server)
})