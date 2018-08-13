const express = require('express')
const {jwtAuth} = require('../jwt')
const testRouter = express.Router()

testRouter.use('/list', jwtAuth, (req, res, next) => {
    res.json({
      'shit': req.tokenObj
    })
})
module.exports = testRouter
