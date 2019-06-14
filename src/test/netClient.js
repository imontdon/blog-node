var net = require('net');
const readLine = require('readline')

const rlInterface = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
})
/* rlInterface.question('你如何看待 Node.js 中文网？', (answer) => {
  // TODO：将答案记录在数据库中。
  console.log(`感谢您的宝贵意见：${answer}`);

  rlInterface.close();
}); */
const client = net.connect({ port: 8080 }, function() {
   console.log('连接到服务器！');  
   client.write('process.stdin.read()' +'\r\n');
  //  client.end();
  setTimeout(() => {
    client.end()
  }, 30000)
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