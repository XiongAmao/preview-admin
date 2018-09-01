const express = require('express')
const {
  userRegister,
  getUserInfo,
  userAuthModify
} = require('../../controller/user_controller')
const testRouter = express.Router()

testRouter.post('/register', userRegister)
testRouter.get('/info/:userid', getUserInfo)
testRouter.put('/action/modify/:userid', userAuthModify)

module.exports = testRouter
