const express = require('express')
const rpRoute = express.Router()

rpRoute.use('/list', function() {

})
// TODO: 需要jwt中间件检查权限
module.exports = rpRoute
