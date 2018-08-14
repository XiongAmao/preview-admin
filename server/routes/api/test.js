const express = require('express')
const { jwtAuth } = require('../../middleware/auth')
const testRouter = express.Router()

testRouter.use('/list', jwtAuth, (req, res, next) => {
  return res.json({
    'shit': req.tokenObj
  })
})
module.exports = testRouter
