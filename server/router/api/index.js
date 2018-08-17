const express = require('express')
const apiRouter = express.Router()
const userRoute = require('./user_route')
const rpRoute = require('./rp_route')
const testRoute = require('./test_route')

apiRouter.use('/user', userRoute)
apiRouter.use('/rp', rpRoute)
apiRouter.use('/test', testRoute)

module.exports = apiRouter
