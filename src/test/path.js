const path = require('path')

console.log(process.env.path)


// 分隔符
console.log(path.delimiter)


// 用户环境变量
const dirArr = process.env.path.split(path.delimiter)

console.log(dirArr)

// 扩展名
console.log(path.extname('./netSetver.js'))


// 拆分与合并
const parse = path.parse(`${__dirname}\\path.js`)
const format = path.format(parse)

console.log(parse, format)

// 是否是绝对路径
const isAbsolute = path.isAbsolute(__dirname)

console.log(isAbsolute)

// path.join([...paths]) 拼接路径

const joinPath = path.join(__dirname, '..', 'router')

console.log(joinPath)

// from去to的相对路径
const relativePath = path.relative(__dirname, joinPath)

console.log(relativePath)

// reslove
// https://www.cnblogs.com/moqiutao/p/8523955.html

const reslovePath = path.resolve(__dirname, '/node_modules') // 会得到e:\node_modules?

console.log(reslovePath) // 好的理解了
/**
 * 理解:
 * path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
 * 相当于
 * cd foo/bar
 * cd /tmp/file/
 * cd ..
 * cd a/../subfile
 * pwd
 * 
 * 注: linux中cd /tmp/xxx 即重新进入根目录(/)下的tmp, 而不是当前目录
 * 所以每次遇到'/'就会进入该磁盘根目录下的xxx文件
 * path.resolve(__dirname, '/node_modules')忽略${__dirname}路径， 重新进入/node_mudules
 * 详见: https://www.cnblogs.com/moqiutao/p/8523955.html
 */