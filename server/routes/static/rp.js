const express = require('express')
const rpDirPath = require('../../config').rpDirPath
const router = express.Router()

router.use(/* 权限校验中间件 */express.static(rpDirPath))
// TODO: 需要jwt中间件检查权限

module.exports = router
