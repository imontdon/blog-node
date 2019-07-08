
process.on('message', (m, server) => {
  console.log('子进程收到消息', m);
  if (m === 'server') {
    server.on('connection', (socket) => {
      socket.end(`由子进程处理pid: ${process.pid}` );
    });
  }
});