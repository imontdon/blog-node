const http = require('http')

const PORT = 1337

const serverHandle = require('../app')

const server = http.createServer(serverHandle)

server.listen(PORT)
console.log('OK')
