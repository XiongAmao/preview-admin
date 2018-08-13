const express = require('express')
const apiRouter = express.Router()
const userRoute = require('./user')
const rpRoute = require('./rp')
// const sketchRoute = require('./sketch')

apiRouter.use('/user', userRoute)
apiRouter.use('/rp', rpRoute)

module.exports = apiRouter
