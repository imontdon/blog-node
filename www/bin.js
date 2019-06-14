const http = require('http')

const PORT = 1997

const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)
console.log('OK')