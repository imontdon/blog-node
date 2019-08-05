const fork = require('child_process').fork
const cpus = require('os').cpus()

const server = require('net').createServer(socket => {
  socket.on('data', chunk => {
    console.log('children message: ', chunk.toString())
  })
})

server.listen(1337)

console.log(`master pid: ${process.pid}`)
const workers = {}
const createWorker = () => {
  const worker = fork(`${__dirname}/worker.js`)
  worker.on('message', (message) => {
    if (message === 'suicide') {
      createWorker()
    }
    console.log('父进程收到消息: ', message)
  })
  worker.on('exit', () => {
    console.log(`worker pid: ${worker.pid} exited.`)
    delete workers[worker.pid]
    createWorker()
  })
  worker.send('server', server)
  workers[worker.pid] = worker
  console.log(`create worker pid: ${worker.pid}`)
}
for (let i = 0; i < cpus.length; i++) {
  createWorker()
}

process.on('exit', () => {
  for (let pid in workers) {
    workers[pid].kill()
  }
})

process.on('uncaughtException', (err) => {
  console.log(`Master uncaughtException:\r\n`);
  console.log(err);
})


