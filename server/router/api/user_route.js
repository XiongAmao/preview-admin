const express = require('express')
const {
  userLogin,
  userLogout,
  userRegister,
  getUserInfo,
  userList,
  userAuthModify
} = require('../../controller/user_controller')
const { adminRoleAuth } = require('../../controller/auth_contoller')
const userRouter = express.Router()

userRouter.post('/login', userLogin)
userRouter.post('/logout', userLogout)
userRouter.post('/register', [adminRoleAuth, userRegister])
userRouter.get('/info/:userid', [adminRoleAuth, getUserInfo])
userRouter.get('/list', [adminRoleAuth, userList])
userRouter.put('/action/modify/:userid', [adminRoleAuth, userAuthModify])
module.exports = userRouter
