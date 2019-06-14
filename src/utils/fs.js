const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './log.txt')

fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(data.toString())
})

const content = '\n测试'
const  opt = {
  flag: 'a'
}
fs.writeFile(fileName, content, opt, (err) => {
  if (err) {
    console.log(err)
  }
})
console.log('fileName: ', fileName)