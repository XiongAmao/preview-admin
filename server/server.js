const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('./db/config/mongoose')
const staticRoute = require('./routes/static')
const apiRoute = require('./routes/api')

const app = express()
const db = mongoose() // 需要保留否则数据库不连接

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', staticRoute)
app.use('/api', apiRoute)

app.use((req, res, next) => {
  res.status(404).json({
    code: 404,
    msg: 'Not Found'
  })
})

app.use(function (err, req, res, next) {
  console.log(err)
  // TODO: 错误验证缺少不同类型的处理方案
  const { code = 500, msg = 'Server error!', name } = err

  // 这里捕获的是插件提供的错误
  if (name === 'JsonWebTokenError') {
    return res.status(401).send({
      code: 4000,
      msg: 'Token invalid.'
    })
  }
  if (name === 'TokenExpiredError') {
    return res.status(401).send({
      code: 4001,
      msg: 'Token expired.'
    })
  }
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 手动返回错误
  res.status(err.status || 500)
  res.send({
    code,
    msg
  })
})

module.exports = app
