

const handleUploadRouter = async (req, res) => {
  const method = req.method

  if (method === 'POST' && req.path === '/api/upload') {
    console.log(req.files)
  }
}