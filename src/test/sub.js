
process.on('message', (m, server) => {
  console.log('子进程收到消息', m);
  // console.log(process.channel, 'channel')
  if (m === 'server') {
    // console.log(server, server.address())
    server.on('connection', (socket) => {
      socket.end(`由子进程处理pid: ${process.pid}` );
    });
  } else {
    process.send({ foo: 'bar', baz: NaN, test: 1 });
  }
});

// 使父进程输出: 父进程收到消息 { foo: 'bar', baz: null }
