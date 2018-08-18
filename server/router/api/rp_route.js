const express = require('express')
const rpRoute = express.Router()
const { getRpList } = require('../../controller/rp_controller')

rpRoute.get('/list', getRpList)

module.exports = rpRoute
