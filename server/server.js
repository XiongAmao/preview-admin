const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const mongoose = require('./db')
const staticRoute = require('./router/static')
const apiRoute = require('./router/api')
const secretKey = require('./config').secretKey
const startSchedule = require('./schedule')
const app = express()
const db = mongoose() // return connection

startSchedule()
// 引入session-cookie
app.use(session({
  secret: secretKey,
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 3600 * 30,
    httpOnly: true
  },
  name: '_session_id',
  store: new MongoStore({
    mongooseConnection: db
  })
}))

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
  const { code = 500, message = 'Server error!' } = err

  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // 手动返回错误
  res.status(err.status || 500)
  res.send({ code, msg: message })
})

module.exports = app
