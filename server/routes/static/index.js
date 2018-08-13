const path = require('path')
const express = require('express')
const staticRoute = express.Router()

const rpStatic = require('./rp')
const sketchStatic = require('./sketch')

// 后台入口资源
staticRoute.use(express.static(path.resolve(__dirname, '../../public')))
staticRoute.use('/rp', rpStatic)
staticRoute.use('/sketch', sketchStatic)

module.exports = staticRoute
