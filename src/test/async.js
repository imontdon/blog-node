const async = require('async')
const fs = require('fs')
const path = require('path')

const fileDir = path.join(__dirname, '../txt')

console.log(fileDir)
// 串行
async.series([
  function(cb) {
    fs.readFile(`${fileDir}/a.txt`, cb)
  },
  function(cb) {
    fs.readFile(`${fileDir}/b.txt`, cb)
  }
], (err, results) => {
  if (err) {
    console.log(err)
  }
  console.log(results.toString())
})
// 并行
async.parallel([
  function(cb) {
    fs.readFile(`${fileDir}/a.txt`, cb)
  },
  function(cb) {
    fs.readFile(`${fileDir}/b.txt`, cb)
  }
], (err, results) => {
  if (err) {
    console.log(err)
  }
  console.log(results.toString())
})
// 串行结果传承
async.waterfall([
  function(cb) {
    setTimeout(() => {
      const fileName = 'a.txt'
      cb(null, fileName)
    }, 1000)
  },
  function(fileName, cb) {
    fs.readFile(`${fileDir}/${fileName}`, (err, data) => {
      cb(err, data.toString())
    }) 
  } 
  /* function(cb) {
    fs.readFile(`${fileDir}/a.txt`, (err, data) => {
      cb(err, data)
    }) 
  },
  function(arg1, cb) {
    fs.readFile(`${fileDir}/${arg1.slice(0, 1)}.txt`, (err, data) => {
      cb(err, data.toString())
    }) 
  } */
], (err, result) => {
  console.log('data', result)
})