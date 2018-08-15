const express = require('express')
const rpDirPath = require('../../config').rpDirPath
const router = express.Router()
const { jwtAuth, rpAuth } = require('../../middleware/auth')

router.use(jwtAuth, rpAuth, express.static(rpDirPath))

module.exports = router
