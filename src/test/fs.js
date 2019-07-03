const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../txt')
const rs = fs.createReadStream(`${filePath}/read.txt`)
const ws = fs.createWriteStream(`${filePath}/c.txt`)

rs.pipe(ws)