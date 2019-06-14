const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

const cp = require('child_process');
const fs = require('fs')
const path = require('path')
const fork = cp.fork(`${__dirname}/sub.js`)
fs.readFile(path.resolve(__dirname, '../utils/log-back.txt'), (err, data) => {
  // console.log(data.toString())
  if (err) {
    fork.send({ err });
  }
  if (data) {
    fork.send({ data: data.toString() });
  }
  fork.on('message', message => {
    console.log('父进程收到消息', message, `${fork.pid}`);
    // fork.disconnect()
  })
  fork.on('exit', (code, signal) => {
    console.log(`子进程退出`, code, signal)
  })
})

const subprocess = require('child_process').fork('sub.js');
const server = require('net').createServer();
// 打开 server 对象，并发送该句柄。
server.on('connection', (socket) => {
  socket.end('由父进程处理');
});
server.listen(1337, () => {
  console.log('服务端启动')
  subprocess.send('server', server);
});

