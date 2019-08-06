const fs = require('fs')
const os = require('os')

const { FILE, formatDate } = require('../utils')
const { errorLog } = require('../utils/log')

const moveFiles = async (req) => {
  const length = req.files.length
  let flag = 0
  let arr = []
  const files = req.files
  for (let file of files) {
    // fs.renameSync(file.path, FILE.FILEPATH + FILE.TYPE.FILE + '/' + file.name)
    fs.rename(file.path, FILE.FILEPATH + FILE.TYPE.FILE + '/' + file.name, (err) => {
      if (err) {
        console.log(err)
        errorLog(`${err} :------${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} -- ${formatDate(new Date())}`)
      }
    })
    flag++
    arr.push({
      filepath: `${ 'http://' + os.networkInterfaces()['以太网'][1].address + ':1997/uploads/' + FILE.TYPE.FILE + '/' + file.name}`,
      type: file.mimetype,
      size: file.size,
      filename: file.name,
    })
    if (flag === length) {
      console.log(arr)
      return await Promise.resolve(arr)
    }
  }
  // return arr
  /* const promise = await Promise.all(files.map(async (file) => { 
    const p = await new Promise(resolve => {
      fs.rename(file.path, FILE.FILEPATH + FILE.TYPE.FILE + '/' + file.name, (err) => {
        if (err) {
          console.log(err)
          errorLog(`${err} :------${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} -- ${formatDate(new Date())}`)
        } else {
          flag++
          arr.push({
            filepath: `${ 'http://' + os.networkInterfaces()['以太网'][1].address + ':1997/uploads/' + FILE.TYPE.FILE + '/' + file.name}`,
            type: file.mimetype,
            size: file.size,
            filename: file.name,
          })
          if (flag === length) {
            resolve(arr)
          }
        }
      })
    })
  })) */

  /* for (let file of req.files) {
    // fs.readFile(file.path, (err, data) => {
    //   if (err) {
    //     console.log(err)
    //     errorLog(`${err} :------${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} -- ${formatDate(new Date())}`)
    //     return err 
    //   }
    //   console.log('READ FILE--------------')
    //   console.log(data)
      fs.rename(file.path, FILE.FILEPATH + FILE.TYPE.FILE + '/' + file.name, (err) => {
        if (err) {
          console.log(err)
          errorLog(`${err} :------${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()} -- ${formatDate(new Date())}`)
        } else {
          flag++
          arr.push({
            filepath: `${ 'http://' + os.networkInterfaces()['以太网'][1].address + ':1997/uploads/' + FILE.TYPE.FILE + '/' + file.name}`,
            type: file.mimetype,
            size: file.size,
            filename: file.name,
          })
          if (flag === length) {
            console.log(arr)
          }
        }
      })
    // })
  } */
}


module.exports = {
  moveFiles
}