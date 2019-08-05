const { execFile, exec } = require('child_process');
const path = require('path')
const cp = require('child_process');
const fs = require('fs')

// const htmlFile = path.join(__dirname, '../txt/write1.txt')

const getHtmlFile = (url) => {
  const type = url.split('https://')[1].split('\.')
  const target = type[type.length - 1].split('item\/')[1].split('\/')[0]
  return path.join(__dirname, `../txt/html/${type[0] + '-' + target}.txt`)
}
execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log('node --version: ', stdout);
});

/* (function fetchHtml(url) {
  exec(`curl ${url}`, (err, stdout, stderr) => {
    if (err) {
      console.log(process.env.path.split(';'))
      throw err
    }
    // const ws = fs.createWriteStream(`${htmlFile}`)
    const ws = fs.createWriteStream(getHtmlFile(url))
    ws.write(stdout, () => {
      console.log('写入完成')
    })
    // console.log('result:', stdout)
  })
})('https://baike.baidu.com/item/curl/10098606?fr=aladdin') */


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

const subprocess = require('child_process').fork(`${__dirname}/sub.js`);
const subprocess1 = require('child_process').fork(`${__dirname}/sub.js`);
const server = require('net').createServer();
// 打开 server 对象，并发送该句柄。
server.on('connection', (socket) => {
  socket.end('由父进程处理');
});
server.listen(1338, () => {
  console.log('服务端启动')
  subprocess.send('server', server);
  subprocess1.send('server', server);
});

