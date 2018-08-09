const express = require('express')

const userRouter = require('./user')

const app = express()

app.use('/user', userRouter)

app.listen(9090, function() {
  console.log('path: localhost:9090')
})

