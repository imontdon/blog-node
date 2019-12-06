const { SuccessModal, ErrorModal } = require('../modal/resModal')
const { getImages } = require('../controller/test')

const handleTestRouter = async (req, res) => {  
  const method = req.method
  if (method === 'POST' || req.path === '/test/lazyload') {
    const data = await getImages()
    return new SuccessModal(data)
  }
}
module.exports = handleTestRouter
