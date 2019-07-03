const readline = require('readline')
const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const { exec } = require('child_process')


const file = path.join(__dirname, '../txt/read.txt')

console.log('file ====', file, process.env.ComSpec)

/* const rl = readline.createInterface({
  input: fs.createReadStream(file)
})

rl.on('line', data => {
  console.log(`文件的每行内容：${data}`)
})
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '请输入命令>'
})

rl.prompt()

rl.on('line', data => {
  // https://blog.csdn.net/liuyaqi1993/article/details/78723797
  exec(`${data}`, { encoding: 'buffer' }, (error, stdout, stdin) => {
    if (error) {
      console.log(`error: ${error}`)
      return
    }
    console.log(iconv.decode(stdout, 'cp936'))
  })
})

