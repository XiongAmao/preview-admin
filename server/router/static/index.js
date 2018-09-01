const path = require('path')
const express = require('express')
const staticRoute = express.Router()
const { permissionAuth, loginAuth } = require('../../controller/auth_contoller')

const rpStatic = require('./rp_route')
// const sketchStatic = require('./sketch_route')

// 后台入口资源
staticRoute.use(express.static(path.resolve(__dirname, '../../dist')))
staticRoute.use('/rp', [loginAuth, permissionAuth('rp'), rpStatic])
// staticRoute.use('/sketch', sketchStatic)

module.exports = staticRoute
