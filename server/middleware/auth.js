const rpAuth = (req, res, next) => {
  console.log('go')
  next()
}

const cookieAuth = (req, res, next) => {
  const sess = req.session
}

module.exports = {
  cookieAuth,
  rpAuth
}
