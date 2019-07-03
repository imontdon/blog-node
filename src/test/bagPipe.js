const async = require('async')
const fs = require('fs')
const path = require('path')

const fileDir = path.join(__dirname, '../txt')

for (let i = 0; i < 100; i++) {
  fs.readFile(`${fileDir}/read.txt`, (err, data) => {
    console.log(data.toString())
  })
  async.parallelLimit([
    function(cb) {
      fs.readFile(`${fileDir}/a.txt`, cb)
    },
    function(cb) {
      fs.readFile(`${fileDir}/b.txt`, cb)
    }
  ], 1, (err, results) => {
    if (err) {
      console.log(err)
    }
    console.log(results.toString())
  })
}