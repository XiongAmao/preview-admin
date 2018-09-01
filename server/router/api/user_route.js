const express = require('express')
const {
  userLogin,
  userLogout,
  userRegister,
  getUserInfo,
  getUserList,
  userAuthModify
} = require('../../controller/user_controller')
const { adminRoleAuth, loginAuth } = require('../../controller/auth_contoller')
const userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.post('/logout', userLogout)
userRouter.post('/register', [loginAuth, adminRoleAuth, userRegister])
userRouter.get('/info/:userid', [loginAuth, adminRoleAuth, getUserInfo])
userRouter.get('/list', [loginAuth, adminRoleAuth, getUserList])
userRouter.put('/action/modify/:userid', [loginAuth, adminRoleAuth, userAuthModify])
module.exports = userRouter
