const { SuccessModal, ErrorModal } = require('../modal/resModal')
const { moveFiles } = require('../controller/upload')

const handleUploadRouter = async (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/upload') {
    // console.log(req)
    const res = await moveFiles(req)
    return new SuccessModal(res)
  }

  if (method === 'GET' && req.path.indexOf('/uploads/file/') > -1 ) {
    return 
  }
}

module.exports = handleUploadRouter