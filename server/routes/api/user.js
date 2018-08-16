const express = require('express')
const jwt = require('jsonwebtoken')
const { UserModel, addUserToken } = require('../../db/model/User')
const { createJTI } = require('../../libs/util')
const jwtCache = require('../cache/jwtCache')
const { jwtAuth } = require('../../middleware/auth')
const { MD5_SUFFIX, md5, secretKey } = require('../../constant')

const userRouter = express.Router()
// TODO: user业务逻辑

userRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const tokenObj = { username }

  if (!username || !password) {
    return next({ code: 400, msg: '请输入账号或密码' })
  }

  UserModel.findOne({ username }, (err, user) => {
    if (err) return next(err)
    if (user) {
      UserModel.findOne({
        username: username,
        password: md5(password + MD5_SUFFIX)   //
      }, (err, user) => {
        if (err) return next(err)
        if (user !== null) {
          // 用户登录成功过后生成token返给前端
          const token = jwt.sign(tokenObj, secretKey, {
            expiresIn: '30 days',
            jwtid: createJTI()
          })
          addUserToken(username, token).then(() => {
            jwtCache.addTokenCache(username, token)
            return res.json({
              code: 200,
              message: '登录成功',
              token: 'Bearer ' + token,
              username
            })
          }, err => {
            return next(err)
          })
        } else {
          return next({ status: 400, code: 400, msg: '账号或密码错误' })
        }
      })
    } else { return next({ msg: '账号或密码不正确' }) }
  })
})

userRouter.post('/logout', jwtAuth, (req, res, next) => {

})

userRouter.post('/register', (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next({
      code: 400,
      msg: '请输入账号或密码'
    })
  }

  UserModel.findOne({
    username
  }, (err, user) => {
    console.log(user)
    if (err) {
      next(err)
    } else if (user === null) {
      const insertObj = {
        username: username,
        password: md5(password + MD5_SUFFIX),
        role: 'normal'
      }
      const newUser = new UserModel(insertObj)
      newUser.save(insertObj, (err, doc) => {
        if (err) {
          return next(err)
        } else {
          return res.json({ code: 200, msg: '用户创建成功' })
        }
      })
    } else {
      return next({
        status: 400,
        code: 4003,
        msg: '用户名已存在'
      })
    }
  })
})

userRouter.get('/:userid', (req, res) => {
  console.log(req.params.userid)
})

module.exports = userRouter
