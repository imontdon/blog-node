const fs = require('fs')
const path = require('path')


console.log(process.arch) // 返回一个表示操作系统CPU架构的字符串

/**
 * @input node process.js one two=three four
 * @output [ 'C:\\Program Files\\nodejs\\node.exe', 'E:\\nodejs\\blog-node\\src\\test\\process.js', one, two=three, four ]
 */
console.log(process.argv) // [ Node.js 进程的可执行文件的绝对路径名, 正在执行的 JavaScript 文件的路径, ... ] [ process.execPath, path.join(__dirname, 'process.js'), ... ][ 'C:\\Program Files\\nodejs\\node.exe', 'E:\\nodejs\\blog-node\\src\\test\\process.js' ]

console.log(process.argv0) // Node.js 进程的可执行文件的绝对路径名

console.log(process.channel) // 转 ./sub.js

// console.log('config: ', process.config) // config

const firstUsage = process.cpuUsage()
console.log(firstUsage)

const nextUsage = process.cpuUsage(firstUsage)
console.log(nextUsage)

console.log(process.cwd()) // dir: E:\nodejs\blog-node

console.log(process.debugPort)

/* process.emitWarning('Something happened!', {
  code: 'MY_WARNING',
  detail: 'This is some additional information'
});
process.on('warning', (warning) => {
  console.log(warning)
  console.warn(warning.name);    // 'Warning'
  console.warn(warning.message); // 'Something happened!'
  console.warn(warning.code);    // 'MY_WARNING'
  console.warn(warning.detail);  // 'This is some additional information'
});

console.log('environment: ', process.env) // 用户环境的对象 */

console.log(process.release)

process.stdin.setEncoding('utf8')

/* const rs = fs.createReadStream(path.resolve(__dirname, '../txt/test.txt'))
rs.on('data', chunk => {
  console.log(chunk.toString())
})
rs.on('end', () => {
  console.log('读取完毕')
})
const ws = fs.createWriteStream(path.resolve(__dirname, '../txt/test.txt'))


console.log(rs.pipe(ws)) */

process.stdin.pipe(process.stdout)