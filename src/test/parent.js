const subprocess = require('child_process').fork(`${__dirname}/child.js`);
const subprocess1 = require('child_process').fork(`${__dirname}/child.js`);
const server = require('net').createServer();
// 打开 server 对象，并发送该句柄。
server.on('connection', (socket) => {
  socket.end('由父进程处理');
});
server.listen(1337, function() {
  console.log('服务端启动')
  subprocess.send('server', server);
  // subprocess1.send('server', server);
});