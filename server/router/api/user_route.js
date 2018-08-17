const express = require('express')
const {
  userLogin,
  userLogout,
  userRegister,
  getUserInfo,
  userList,
  userAuthModify
} = require('../../controller/user_controller')
const userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.post('/logout', userLogout)
userRouter.post('/register', userRegister)
userRouter.get('/info/:userid', getUserInfo)
userRouter.get('/list', userList)
userRouter.put('/action/modify/:userid', userAuthModify)
module.exports = userRouter
