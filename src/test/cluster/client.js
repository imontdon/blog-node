var net = require('net');
for (let i = 0; i < 8; i++) {
  setTimeout(() => {
    const client = net.connect({ port: 1337 }, function() {
      console.log('连接到服务器！');  
      client.write('process.stdin.read()' +'\r\n');
     //  client.end();
     setTimeout(() => {
       client.end()
     }, 3000)
    });
    client.on('error', (e) => {
     console.log(e)
    })
    client.on('data', function(data) {
      console.log(data.toString());
     //  client.end();
    });
    client.on('end', function() { 
      console.log('断开与服务器的连接');
    });
  }, 1000)
}