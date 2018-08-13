const express = require('express')
const apiRouter = express.Router()
const userRoute = require('./user')
const rpRoute = require('./rp')
const testRoute = require('./test')
// const sketchRoute = require('./sketch')

apiRouter.use('/user', userRoute)
apiRouter.use('/rp', rpRoute)
apiRouter.use('/test', testRoute)

module.exports = apiRouter
