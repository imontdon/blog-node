const fs = require('fs')
const path = require('path')

const createWriteStream = (fileName) => {
  const fullName = path.join(__dirname, '../', '../logs', fileName)
  const writeStream = fs.createWriteStream(fullName, { flags: 'a' })
  return writeStream
}

const accessWriteStream = createWriteStream('access.log')

const access = (log) => {
  writeLog(accessWriteStream, log)
}

const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n\r')
}

module.exports = {
  access
}