process.on('message', (m, server) => {
  console.log('子进程收到消息', m);
  if (m === 'server') {
    console.log(server, server.address())
    server.on('connection', (socket) => {
      socket.end('由子进程处理');
    });
  } else {
    process.send({ foo: 'bar', baz: NaN });
  }
});

// 使父进程输出: 父进程收到消息 { foo: 'bar', baz: null }
