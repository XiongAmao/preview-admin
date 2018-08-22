const express = require('express')
const {
  userRegister,
  getUserInfo,
  userList,
  userAuthModify
} = require('../../controller/user_controller')
const testRouter = express.Router()

testRouter.post('/register', userRegister)
testRouter.get('/info/:userid', getUserInfo)
testRouter.get('/list', userList)
testRouter.put('/action/modify/:userid', userAuthModify)

module.exports = testRouter
