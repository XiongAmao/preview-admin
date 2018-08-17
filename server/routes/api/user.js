const express = require('express')
const { UserModel, checkUserPassword, addUser } = require('../../db/model/User')
const { jwtAuth } = require('../../middleware/auth')
const { MD5_SUFFIX, md5, secretKey } = require('../../constant')

const userRouter = express.Router()
// TODO: user业务逻辑

userRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next({ code: 400, msg: '请输入账号或密码' })
  }
  checkUserPassword(username, password)
    .then(() => {
      req.session.username = username
      req.session.hasLogin = true
      return res.json({
        code: 200,
        message: '登录成功',
        username
      })
    })
    .catch(err => {
      return next(err)
    })
})

userRouter.post('/logout', (req, res, next) => {
  const session = req.session
  if (session.hasLogin) {
    session.regenerate(() => {
      return res.json({
        msg: 'Logout.',
        code: 20000
      })
    })
  } else {
    return res.json({
      msg: 'It\'s not login',
      code: 20001
    })
  }
})

userRouter.post('/register', (req, res, next) => {
  const { username, password } = req.body

  if (!username || !password) {
    return next({
      code: 400,
      msg: '请输入账号或密码'
    })
  }
  addUser(username, password)
    .then(() => {
      res.json({ msg: '账号已创建' })
    })
    .catch(err => {
      next(err)
    })
})

userRouter.get('/:userid', (req, res) => {
  console.log(req.params.userid)
})

module.exports = userRouter
