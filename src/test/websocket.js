const http = require('http')
const crypto = require('crypto')


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('HELLO WORLD\n')
})

server.on('upgrade', (req, socket, upgradeHead) => {
  console.log(req.headers)
  console.log('upgradeHead', upgradeHead.length)

  let key = req.headers['sec-websocket-key']
  const shasum = crypto.createHash('sha1')
  key = shasum.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64')
  const headers =  [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    'Sec-WebSocket-Accept: ' + key
  ];
  socket.setNoDelay(true)
  socket.write(key)
  // const websocket = new WebSocket()
  // websocket.setSocket(socket)

})

server.listen(1337)

