const express = require('express')
const testRouter = express.Router()

testRouter.use('/list', (req, res, next) => {
  return res.json({
    'shit': req.tokenObj
  })
})
module.exports = testRouter
