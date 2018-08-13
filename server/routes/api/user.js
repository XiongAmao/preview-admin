const express = require('express')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../db/model/User')
const { MD5_SUFFIX, md5, secretKey } = require('../../constant')
const { createJTI } = require('../../libs/util')

const userRouter = express.Router()
// TODO: user业务逻辑
userRouter.get('/:userid', (req, res) => {
  console.log(req.params.userid)
})

userRouter.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const tokenObj = {
    username
  }
  if (!username || !password) {
    return next({ code: 400, msg: '请输入账号或密码' })
  }
  UserModel.findOne({
    username
  }, (err, user) => {
    if (err) return next()

    if (user) {
      UserModel.findOne({ //判断密码是否正确
        username: username,
        password: md5(password + MD5_SUFFIX),
      }, (err, user) => {
        if (user !== null) {
          // 用户登录成功过后生成token返给前端
          let token = jwt.sign(tokenObj, secretKey, {
            expiresIn: '30 days',
            jwtid: createJTI()
          })
          return res.json({
            code: 200,
            message: '登录成功',
            token: 'Bearer ' + token,
            username
          })
        } else {
          return next({
            msg: '账号或密码错误'
          })
        }
      })
    } else {
      return next({
        msg: '账号或密码不正确'
      })
    }
  })
})

userRouter.post('/logout', (req, res, next) => {
  const { username, password } = req.body
  const tokenObj = {
    username
  }
  UserModel.findOne({
    username
  }, (err, user) => {
    if (err) return next()

    if (user) {
      UserModel.findOne({ //判断密码是否正确
        username: username,
        password: md5(password + MD5_SUFFIX),
      }, (err, user) => {
        if (user !== null) {
          // 用户登录成功过后生成token返给前端
          let token = jwt.sign(tokenObj, secretKey, {
            expiresIn: '30 days',
            jwtid: createJTI()
          })
          return res.json({
            code: 200,
            message: '登录成功',
            token: 'Bearer ' + token,
            username
          })
        } else {
          return next({
            msg: '账号或密码错误'
          })
        }
      })
    } else {
      return next({
        msg: '账号或密码不正确'
      })
    }
  })
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
          return res.json({ result: false, msg: '用户创建失败' })
        } else {
          console.log(doc);
          return res.json({ code: 200, msg: '用户创建成功' })
        }
      })
    } else {
      return res.status(400).json({
        code: 400,
        msg: '用户名已存在'
      })
    }
  })
})
module.exports = userRouter

// mongoose.connection.on('connected', function() {
//   console.log('mongo connected')
// })

// const User = mongoose.model('account', new mongoose.Schema({
//   account: {type: String, require: true},
//   role: {type: Array},
//   admin: {type: Boolean},
//   rpList: {type: Array}
// }))

// User.create({
//   account: 'admin',
//   role: ['admin'],
//   admin: false,
//   rpList: ['admin/adsdf/adfasdf']
// }, function(err, doc) {
//   console.log(doc)
// })
